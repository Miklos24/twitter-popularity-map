from models import db, StateModel
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from constants import LIST_OF_STATES
from searchtweets import ResultStream, gen_request_parameters, load_credentials, collect_results
import pandas as pd
import numpy as np
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import time
import datetime as dt
from flask import Flask

import nltk
nltk.download('vader_lexicon')
vader = SentimentIntensityAnalyzer()


app = Flask(__name__, static_folder='../build', static_url_path='/')

# TODO: This should be an environment variable
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
    search_args = load_credentials(
        "./.twitter_keys.yaml", yaml_key="search_tweets_v2", env_overwrite=False)

    resp_dict = dict()
    for state in LIST_OF_STATES:
        qry_str = "entity:\"" + state + "\" -is:retweet"
        query = gen_request_parameters(qry_str, results_per_call=10)
        tweets = collect_results(query, max_tweets=10,
                                 result_stream_args=search_args)
        df = pd.DataFrame.from_dict(tweets[:-1])
        df['scores'] = df['text'].apply(
            lambda text: vader.polarity_scores(text)['compound'])
        neg = int(df[df['scores'] < -0.1].count()['id'])
        pos = int(df[df['scores'] > 0.1].count()['id'])
        resp_dict[state] = (neg, pos)
        print(df)

    return resp_dict


@app.route('/api/tweets')
def get_tweets():
    # res = fetch_new_tweets()
    res = {"California": (0, 1)}
    for state, scores in res.items():
        new_entry = StateModel(state=state, date_retrieved=dt.datetime.now(
        ), neg_score=scores[0], pos_score=scores[1])
        db.session.add(new_entry)
        db.session.commit()

    return res


if __name__ == '__main__':
    app.run(threaded=True, port=5000)
