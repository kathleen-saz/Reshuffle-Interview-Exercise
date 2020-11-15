const { Reshuffle } = require('reshuffle')
const { NlpConnector } = require('reshuffle-nlp-connector')
const { TwitterConnector } = require('reshuffle-twitter-connector')

require('dotenv').config({path: __dirname + '/.env'})

//initialise the app
const app = new Reshuffle()

//initiallise NLP connector
const nlpConnector = new NlpConnector(app)

//configure twitter connector
const twitter = new TwitterConnector(app, {
  customerKey: process.env.API_KEY,
  customerSecret: process.env.API_SECRET,
})

//query hashtag and analyse sentiment
twitter.on({ search: '#hahahutest123' }, async (event, app) => {
  for (const tweet of event.tweets) {
    const result = nlpConnector.sentiment(tweet.text)
    console.log('Score: ', result.score, ' Vote: ', result.vote, ' Emoji: ', result.emoji)
  }
})

//start the app
app.start()
