const reddit = require('../utils/reddit')

// The Type Ahead API.
module.exports = function (req, res) {
  const term = req.query.text.trim()

  if (!term) {
    res.json([{
      title: '<i>(enter a search term)</i>',
      text: ''
    }])
    return
  }

  reddit.search(term).then((urls) => {
    res.json(urls.map(function (imageUrl) {
      return {
        title: '<img style="height:75px" src="' + imageUrl + '">',
        text: imageUrl
      }
    }
    ))
  })

}
