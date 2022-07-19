var fs = require('fs')
var path = require('path')

const chalk = require('chalk')
// const inquirer = require('inquirer')
const shell = require('shelljs')
const deploy = require('@tencent/workflow-api')
const deployDir = path.resolve(process.cwd(),'dist')
const targetDir = 'halfyear2020/images/15'

class UploadImg {
  /**
   * @param {String} target 静态目录名称
   * @param {String} parent 静态目录所属目录名称，各目录使用 / 分割
   */
  constructor (target, parent = '') {
    this.target = target
    this.parent = parent
  }
  init () {
    this.createStaticDir()
      .then((ret) => {
        if (ret.code === 0) {
          this.uploadStatic()
          // .then((ret) => {
          //   this.uploadTemplate()
          // })
        }
      })
  }
  createStaticDir () {
    console.log(chalk.red('create static dirctory......'))
    return new Promise((resolve, reject) => {
      fs.stat(path.resolve(__dirname, 'file.lock'), (err, stats) => {
        if (true) {
          deploy.createDir(this.target, `/${this.parent}`)
            .then((ret) => {
              if (ret.code === 0) {
                console.log(chalk.green(`创建静态素材目录${this.target}成功`))
                fs.writeFile(path.resolve(__dirname, 'file.lock'), -1, 'utf8', (err) => {
                  if (err) throw err
                })
                shell.mkdir(path.resolve(__dirname, 'ids'))

                resolve({
                  code: 0,
                  msg: 'directory created successed!'
                })
              }
            })
        } else {
          console.log(chalk.green(`静态素材目录${this.target}已经存在`))
          resolve({
            code: 0,
            msg: 'directory created successed!'
          })
        }
      })
    })
  }
  uploadStatic () {
    console.log(chalk.red('img uploading......'))
    const staticDir = deployDir + '/'+targetDir
    console.log(staticDir);
    return new Promise((resolve, reject) => {
      fs.readdir((staticDir), 'utf8', (err, files) => {
        console.log(err)
        if (err) throw err

        const promiseAll = []
        files.map((file, index, context) => {
          console.log(file)
          console.log(`${this.parent}/${this.target}`);
          let promiseFile = deploy.addMaterial(`${staticDir}/${file}`, `${this.parent}/${this.target}`)
          promiseAll.push(promiseFile)
        })
        Promise.all(promiseAll)
          .then((rets) => {
            
            rets.map((ret, index, context) => {
              console.log(chalk.red(ret.msg))
              ret.data && ret.data.url && console.log(chalk.green(ret.data.url))
            })
            resolve({
              code: 0,
              msg: '静态文件上传成功'
            })
          })
      })
    })
  }
}

const upload = new UploadImg(targetDir, 'yyh5')

console.log(chalk.green('正在上传静态文件...'))
upload.init()
