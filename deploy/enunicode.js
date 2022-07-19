var fs = require('fs')
var path = require('path')

var filePath = path.resolve(process.cwd(), 'dist')
filePath = filePath + '/army70'
// readdir方法读取文件名
// readFile方法读取文件内容
// writeFile改写文件内容
class Enunicode {
  init () {
    fs.readdir((filePath), 'utf8', (err, data) => {
      if (err) throw err
      data.forEach(function (item) {
        fs.readFile(filePath + '/' + item, 'utf8', (err, files) => {
          if (err) throw err
          var result = files.replace(/[\u00FF-\uFFFF]/g, function ($0) {
            return '\\u' + ('00' + $0.charCodeAt().toString(16)).slice(-4)
          })
          fs.writeFile(filePath + '/' + item, result, 'utf8', function (err) {
            if (err) return console.log(err)
          })
        })
      })
    })
  }
}
const enunicode = new Enunicode()
enunicode.init()
