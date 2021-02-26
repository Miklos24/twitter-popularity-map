import nltk
import pandas as pd
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.tokenize.treebank import TreebankWordDetokenizer
from sklearn.feature_extraction.text import CountVectorizer
import numpy as np

# sample tweet list
tweets = [{'id': '1365187025113141250',
           'text': "Reddick was horrible in the southern 500. He couldn't get the car under him and fought it all night then also got damage in stage 3. Had a loose wheel and then pushed over the edge and got in the wall at Vegas. He was right on the edge of the top 15 at Kansas and Texas."},
          {'id': '1365186994687606784', 'text': '"YOU CANT JUST DROP GERMANY IN TEXAS"\n\nwatch me.'},
          {'id': '1365186957891039232', 'text': 'wtf is wrong w texas is dat lighting'}, {'id': '1365186918410051584',
                                                                                          'text': 'Now we learn that Texas, the only state in the US with its own power grid, is choosing, yet again, not to insulate its power grid. Not the 10% of renewables or the 90% of fossil fuel plants. Republicans didn’t catch on in the outage in the late 80’s, the 2011 outage, or this one.'},
          {'id': '1365186820523327489', 'text': 'Texas accents :heart_eyes: fuuuuuuck'},
          {'id': '1365186589727412226', 'text': 'Texas bball may be happening in the next few months :eyes:'},
          {'id': '1365186431124189184',
           'text': "Texas weather sure be coming for us y'all. These scattered thunderstorms sure don't think I should be sleeping, huh?"},
          {'id': '1365186274601148420', 'text': 'men from texas got angus beef in the dicks. cocks on THICK and MEATY'},
          {'id': '1365186261426839552',
           'text': 'I finally got up to 100-2k views. people loved my skin and i understand that other OG streamers deserve it more than me because they get views.. I streamed over 60 hours in 2-3 days when i got my drop. (i could more cus of texas)'},
          {'id': '1365186242414018564',
           'text': 'It should be illegal for Texas to have a speed limit of 65 mph on highways'},
          {'newest_id': '1365187025113141250', 'oldest_id': '1365186242414018564', 'result_count': 10,
           'next_token': 'b26v89c19zqg8o3fosntc7o67xfut6tmgml450h8kg2gt'}]


def removeAtWords(to_be_filtered):
    for idx, word in enumerate(to_be_filtered):
        if idx != 0 and to_be_filtered[idx - 1] == '@':
            to_be_filtered.remove(to_be_filtered[idx - 1])
            to_be_filtered.remove(word)
    return to_be_filtered


def removeLinkAddress(to_be_filtered):
    for idx, word in enumerate(to_be_filtered):
        if word == 'http' or word == 'https':
            to_be_filtered.remove(to_be_filtered[idx + 1])
    return to_be_filtered


# use regexp from https://www.kite.com/python/answers/how-to-remove-all-punctuation-marks-with-nltk-in-python
# to keep contractions with punctuation
def removePunctuation(to_be_filtered):
    tokenizer = nltk.RegexpTokenizer(r"\w+")
    s = [w for w in to_be_filtered if tokenizer.tokenize(w)]
    return s


def makeCorpus(sentiment_df, sentiment_corpus):
    stop_words = set(stopwords.words('english'))

    for sent in sentiment_df.text:
        word_tokens = word_tokenize(sent)
        filtered_sentence = [w for w in word_tokens if not w in stop_words]
        filtered_sentence = removeAtWords(filtered_sentence)
        filtered_sentence = removePunctuation(filtered_sentence)
        filtered_sentence = removeLinkAddress(filtered_sentence)

        filtered_sentence = TreebankWordDetokenizer().detokenize(filtered_sentence)
        sentiment_corpus.append(filtered_sentence)

    return sentiment_corpus


def drop_stop_word_index(df):
    indexes = []

    for index_name in df.index:
        if index_name in set(stopwords.words('english')):
            indexes.append(index_name)

    new_df = df.drop(index=indexes, axis=0)
    # print(new_df)
    return new_df


def most_used_words(tweet_list):
    """
    Gets top five most used words in a list of tweets. Meant for a collection of tweets for a state.

    :param tweet_list: list of dictionaries holding tweet data
    :return: dict of descending sum in the format: {'texas': 10, 'got': 5, 'drop': 2, 'edge': 2, 'grid': 2}
    """
    # tweet_list = tweets
    nltk.download('stopwords')
    nltk.download('punkt')

    df = pd.DataFrame(tweet_list)

    df = df.drop(axis=0, index=10)

    tweets_corpus = []

    tweets_corpus = makeCorpus(df, tweets_corpus)
    # print(tweets_corpus)

    np.set_printoptions(precision=3)

    vectorizer = CountVectorizer()

    X = vectorizer.fit_transform(tweets_corpus)

    # print(vectorizer.get_feature_names())
    # print(X.toarray())

    count_df = pd.DataFrame(X.toarray(), columns=vectorizer.get_feature_names())
    # print(count_df)
    count_df = count_df.aggregate(['sum'])
    count_df = count_df.sort_values(by='sum', ascending=False, axis=1)
    # print(count_df)

    count_df_transposed = count_df.transpose()
    count_df_transposed_dropped = drop_stop_word_index(count_df_transposed)

    my_dict = df.iloc[:5].to_dict()
    return my_dict['sum']
