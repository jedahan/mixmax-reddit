// The API that returns the in-email representation.
module.exports = function (req, res) {
  res.json({body: '<p><img style="max-width:100%;" src="' + req.query.text.trim() + '"/></p>'})
}
