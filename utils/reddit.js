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
      if (term.length < 7) { reject('small') }

      const options = {limit: 100}
      let subreddit = '/hot'

      if (/^(r\/\w+)/.test(term)) {
        subreddit = /^(r\/\w+)/.exec(term)[1]
        if (/\ (.*)$/.test(term)) {
          subreddit += '/search'
          options.q = /\ (.*)$/.exec(term)[1]
          options.restrict_sr = true
          options.type = 'link'
        } else {
          subreddit += '/hot'
        }
      } else {
        options.q = term
      }

      reddit('/r/unexpected/hot').get(options).then((slice) => {
        resolve(slice.data.children
          .filter((child) => /imgur.com\/(\w+)\.(\w+)/.test(child.data.url))
          .map((child) => {
            if (/gifv$/.test(child.data.url)) {
              return child.data.url.slice(0, -1)
            }
            return child.data.url
          })
        )
      })
    }
  )
}

module.exports = {search}
