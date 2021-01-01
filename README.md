# Hated in the Nation
A visualization of Twitter sentiment analysis.

## The Big Idea
In short, this project is intended to showcase how Twitter users' opinions on the 50 states in the USA change over time. 

## The Tech Stack

This project is deployed on [Heroku](https://twitter-popularity-map.herokuapp.com) and uses Flask for its backend. In order to get the initial data for analysis, Flask queries the Twitter APIv2 and stores that information in a PostgreSQL database. The processed data produced by Flask is communicated to a React frontend using a REST API.

## The Analysis
Each day, I sample 100 tweets per states using the Twitter APIv2. In this query, I use the API's new Annotations feature to grab Tweets about a particular state, and attempt to filter out bots by disallowing links. I also use Annotations to attempt to filter out sports-related results, which aren't explicitly about the state itself. I then use the Natural Language Toolik (NTLK), a natural language processing library for Python, to determine the general sentiment of every tweet. Based off of the score that NTLK generates, I categorize each tweet as either positive, negative, or neutral. Each state is then scored on its percentage of positive and negative tweets. I also store the most negative and positive tweet (according to NTLK) as example tweets to later show the user.

## The Visualization

After the data is passed to React via the REST API, I use simple-react-maps to generate a heatmap of the US. Depending on the settings that the user selects, the map will color scale based on either how "loved" or "hated" states are. User's may also use the date slider to query a specific date, and can use the slider to see how sentiments change over time.

## Moving Forward
In the future, I would like to provide the end user with some more information about each state, such as its overall ranking. I would also like the user to see an example tweet for each sentiment for each state on each date.


