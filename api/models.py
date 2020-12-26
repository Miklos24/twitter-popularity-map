from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class StateModel(db.Model):
    __tablename__ = 'state_table'

    id = db.Column(db.Integer, primary_key=True)
    state = db.Column(db.String())
    date_retrieved = db.Column(db.Date())
    pos_score = db.Column(db.Integer())
    neg_score = db.Column(db.Integer())

    def __init__(self, state, date_retrieved, neg_score, pos_score):
        self.state = state
        self.date_retrieved = date_retrieved
        self.neg_score = neg_score
        self.pos_score = pos_score

    def __repr__(self):
        return f"{self.state} on {self.date_retrieved}: ({self.pos_score}, {self.neg_score})"
