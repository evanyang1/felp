const Sentiment = require('sentiment')
const sentiment = new Sentiment

// should the post go public?
const canGoPublic = text => {
    let comparative = sentiment.analyze(text).comparative
    return comparative >= -0.3
} 

module.exports = canGoPublic
