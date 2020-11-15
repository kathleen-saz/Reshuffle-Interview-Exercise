const { Reshuffle } = require('reshuffle')
const { NlpConnector } = require('reshuffle-nlp-connector')
const readline = require('readline');
const fs = require('fs');

require('dotenv').config({path: __dirname + '/.env'})

//initialise the app
const app = new Reshuffle()

//initiallise NLP connector
const nlpConnector = new NlpConnector(app)

var interface = readline.createInterface({
  input: fs.createReadStream('data.txt')
});

interface.on('line', async function (line) {
    const result = await nlpConnector.sentiment(line)
    console.log('Comment: ', line,'Score: ', result.score, ' Vote: ', result.vote, ' Emoji: ', result.emoji)
});

//start the app
app.start()
