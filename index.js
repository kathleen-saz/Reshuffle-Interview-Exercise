const { Reshuffle, CronConnector } = require('reshuffle')
const { NlpConnector } = require('reshuffle-nlp-connector')
const { TwitterConnector } = require('reshuffle-twitter-connector')

require('dotenv').config({path: __dirname + '/.env'})

//initialise the app
const app = new Reshuffle()

//initiallise NLP connector
const nlpConnector = new NlpConnector(app)

//initialise Cron connector
const cronConnector = new CronConnector(app)

//set event for cron connector
cronConnector.on({ expression: '0 0 0 * * *' }, (event, app) => {
    app.getConnector('connectors/email').send({
      to: 'email@exmaple.com',
      subject: 'daily report!',
      html: 'The report itself',
    })
  })

//configure twitter connector
const twitter = new TwitterConnector(app, {
  customerKey: process.env.API_KEY,
  customerSecret: process.env.API_SECRET,
})

twitter.on({ follow: 'taylorswift13' }, async (event, app) => {
  for (const tweet of event.tweets) {
    const result = nlpConnector.language(tweet.text)
    console.log('Name: ', result.name, ' Code: ', result.code)
  }
})

//start the app
app.start()

main()