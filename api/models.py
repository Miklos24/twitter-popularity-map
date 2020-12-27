from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class StateModel(db.Model):
    __tablename__ = 'state_table'

    id = db.Column(db.Integer, primary_key=True)
    state = db.Column(db.String())
    date_retrieved = db.Column(db.Date())
    pos_score = db.Column(db.Integer())
    neg_score = db.Column(db.Integer())
    pos_tweet = db.Column(db.String())
    neg_tweet = db.Column(db.String())

    def __init__(self, state, date_retrieved, neg_score, pos_score, neg_tweet, pos_tweet):
        self.state = state
        self.date_retrieved = date_retrieved
        self.neg_score = neg_score
        self.pos_score = pos_score
        self.neg_tweet = neg_tweet
        self.pos_tweet = pos_tweet

    def __repr__(self):
        return f"{self.state} on {self.date_retrieved}: ({self.pos_score}, {self.neg_score})"
