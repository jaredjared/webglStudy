/**
 * sync remote cms page to local.
 *
 * @author samhou<samhou@tencent.com>
 * @date  2017/11/10 16:00
 */
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const deploy = require('@tencent/workflow-api')
const decode = require('decode-html')
const shell = require('shelljs')

// sync page by name
const syncPages = ['index']

function padZero (digtal) {
  return digtal > 9 ? digtal : '0' + digtal
}

let currentdate = new Date()
let day = currentdate.getDate()
let month = padZero(currentdate.getMonth() + 1)
let year = padZero(currentdate.getFullYear())
let hour = padZero(currentdate.getHours())
let minute = padZero(currentdate.getMinutes())
let second = padZero(currentdate.getSeconds())

let dirName = `${year}${month}${day}${hour}${minute}${second}`

// create backup directory by current time
shell.mkdir(path.resolve(__dirname, dirName))

console.log(chalk.red('page sync......'))
syncPages.map((value, key, context) => {
  fs.readFile(path.resolve(__dirname, `ids/${value}`), (err, data) => {
    if (err) {
      throw new Error(err)
    }

    // get page id by local file.
    let id = parseInt(data)

    /**
     * @param id number CMS page id
     * @param sitename string CMS sitename
     * @param catelog string CMS catelog name
     */
    deploy.syncPage(id, 'yslp', 'yyh5')
      .then((data) => {
        if (data.code === 0) {
          let content = decode(data.data.content)
          fs.writeFile(path.resolve(__dirname, `${dirName}/${value}.htm`), content, 'utf8', (err) => {
            if (err) throw err

            console.log(chalk.green(`Sync ${value} content  success`))
          })
        } else {
          console.error(chalk.red(data.msg))
        }
      })
  })
})
