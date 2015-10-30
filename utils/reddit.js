const Snoocore = require('snoocore')

const reddit = new Snoocore({
  userAgent: '/u/jedahan mixmax-reddit@0.0.1',
  oauth: {
    type: 'implicit',
    key: 'X7U-xPOeigk0OA',
    redirectUri: 'http://localhost:9145/authorize_callback',
    scope: [ 'read' ]
  }
})

const search = function (term) {
  return new Promise(
    function (resolve, reject) {
      if (term.length < 3) { reject('small') }

      if (term.indexOf('r/') !== 0) {
        reddit('/hot').get({q: term + '&site:imgur.com', type: 'link'}).then((slice) => {
          resolve(slice.data.children.map((child) => child.data.selftext))
        })
      } else if (term.indexOf(' ') > 3) {
        let regex = /^(r\/\w+) (.*)/.exec(term)
        let subreddit = regex[1]
        term = regex[2]

        reddit(subreddit).get({q: term + '&site:imgur.com', restrict_sr: true, type: 'link'}).then((slice) => {
          resolve(slice.data.children
            .filter((child) => /\.gif$/.test(child.data.selftext))
            .map((child) => child.data.selftext))
        })
      }
    }
  )
}

module.exports = {search}
