var fs = require('fs')
var path = require('path')
module.exports = function(cb) {
  absoluteFilePaths('csvs', function(err, csvs) {
    if (err) return cb(err)
    absoluteFilePaths('json', function(err, json) {
      var items = []
      for (var i = 0; i < csvs.length; i++) {
        var item = {
          csv: fs.readFileSync(csvs[i]),
          json: fs.readFileSync(json[i])
        }
        items.push(item)
      }
      cb(err, items)
    })
  })
}

function absoluteFilePaths(folder, cb) {
  fs.readdir(folder, function(err, files) {
    if (err) return cb(err)
    cb(null, files.map(function(f) { return path.resolve(folder, f) }))
  })
}