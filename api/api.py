import nltk
import requests
from flask import Flask, request
import datetime as dt
import time
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import numpy as np
from models import db, StateModel
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from constants import LIST_OF_STATES
from searchtweets import ResultStream, gen_request_parameters, load_credentials, collect_results
import pandas as pd

nltk.download('vader_lexicon')
vader = SentimentIntensityAnalyzer()


app = Flask(__name__, static_folder='../build', static_url_path='/')

# TODO: This should be an environment variable
app.config.from_envvar('SQLALCHEMY_DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
migrate = Migrate(app, db)


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/api/time')
def get_current_time():
    return {'time': time.ctime()}


def fetch_new_tweets():
    # TODO: Allow this to look for env variables
    #
    search_args = load_credentials(
        "./.twitter_keys.yaml", yaml_key="search_tweets_v2", env_overwrite=False)

    resp_dict = dict()
    for state in LIST_OF_STATES:
        qry_str = "entity:\"" + state + "\" -is:retweet lang:en -has:links -has:mentions -context:11.689566306014617600 -context:11.706083902411055104 -context:11.769193663230468096"
        query = gen_request_parameters(qry_str, results_per_call=50)
        try:
            tweets = collect_results(query, max_tweets=250,
                                 result_stream_args=search_args)
            df = pd.DataFrame.from_dict(tweets)
            df['scores'] = df['text'].apply(
                lambda text: vader.polarity_scores(str(text))['compound'])
            neg = int(df[df['scores'] < -0.1].count()['id'])
            neg_tweet = df[df['scores'] ==
                           df['scores'].min()].iloc[0]["text"]
            pos = int(df[df['scores'] > 0.1].count()['id'])
            pos_tweet = df[df['scores'] ==
                           df['scores'].max()].iloc[0]["text"]
            resp_dict[state] = (neg, pos, neg_tweet, pos_tweet)
            print(df)
        except requests.exceptions.HTTPError as e:
            print(e)

    return resp_dict


@app.route('/api/tweets')
def get_tweets():
    # res = fetch_new_tweets()
    date = dt.date.today()

    res = dict()
    for state_dat in db.session.query(StateModel):
        if (date - state_dat.date_retrieved).days == 0:
            res[state_dat.state] = (
                state_dat.neg_score, state_dat.pos_score, state_dat.neg_tweet, state_dat.pos_tweet)

    if len(res) == 0:
        res = fetch_new_tweets()
        for state, scores in res.items():
            new_entry = StateModel(state=state, date_retrieved=dt.datetime.now(
            ), neg_score=scores[0], pos_score=scores[1], neg_tweet=scores[2], pos_tweet=scores[3])
            db.session.add(new_entry)
            db.session.commit()

    return res


if __name__ == '__main__':
    app.run(threaded=True, port=5000)
