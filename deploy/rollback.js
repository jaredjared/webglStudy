/**
 * rollback from current backup.
 *
 * @author samhou<samhou@tencent.com>
 * @date 2017/11/10 01:24
 *
 * Example
 * npm run rollback 20171011052213 will mv files under the
 * 20171011052213 directory to build *.htm
 *
 * `npm run copy` & input datetime dirctory.
 */
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const inquirer = require('inquirer')
const shell = require('shelljs')

const questions = [{
  type: 'input',
  name: 'endpoint',
  message: 'Please input your rollback version',
  default: () => {
    return '20171011052213'
  }
}]

inquirer.prompt(questions).then((answers) => {
  let endpoint = answers.endpoint
  fs.readdir(path.resolve(__dirname, endpoint), (err, files) => {
    if (err) {
      throw new Error(err)
    }

    console.log(chalk.red('rollbacking!!!'))
    files.map((file, key, context) => {
      let fullpath = path.resolve(__dirname, `${endpoint}/${file}`)
      let targetpath = path.resolve(__dirname, `../build/${file}`)
      console.log(chalk.green('rollback template file: ' + file))
      shell.cp(fullpath, targetpath)
    })
    console.log(chalk.red('rollbacked!!!'))
  })
})
