const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const inquirer = require('inquirer')
const shell = require('shelljs')
const deploy = require('@tencent/workflow-api')
const deployDir = path.resolve(process.cwd(), 'dist')
const targetDir = 'army70'
const sitename = 'yslp'
const catelog = 'yyh5'
const env = true

const proename='army70'
const procname='army70'

let firstTime=true;

class Upload {
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
            .then((ret) => {
              this.uploadTemplate()
            })
        }
      })
  }

  createStaticDir () {
    console.log(chalk.red('create static dirctory......'))
    return new Promise((resolve, reject) => {
      fs.stat(path.resolve(__dirname, 'file.lock'), (err, stats) => {
        if (firstTime) {
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
          console.log(chalk.green(`创建静态素材目录${this.target}成功`))
          resolve({
            code: 0,
            msg: 'directory created successed!'
          })
        }
      })
    })
  }

  uploadStatic () {
    console.log(chalk.red('static uploading......'))
    const staticDir = deployDir + '/'+targetDir
    return new Promise((resolve, reject) => {
      fs.readdir((staticDir), 'utf8', (err, files) => {
        if (err) throw err

        const promiseAll = []
        files.map((file, index, context) => {
          let promiseFile = deploy.addMaterial(`${staticDir}/${file}`, `${this.parent}/${this.target}`)
          promiseAll.push(promiseFile)
        })
        Promise.all(promiseAll)
          .then((rets) => {
            rets.map((ret, index, context) => {
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

  uploadTemplate () {
    console.log(chalk.red('page uploading......'))
    let pages = [{
      ename: proename,
      cname: procname
    }]
    pages.map((page, key, context) => {
      let pageURL = `${deployDir}/index.html`
      console.log(chalk.blue(pageURL))
      let content = fs.readFileSync(path.resolve(__dirname, pageURL), 'utf8')
      let cname = page['cname']
      let ename = page['ename']
      if (env) {
        cname += '_测试'
        ename += '_test'
      }

      fs.stat(path.resolve(__dirname, 'file.lock'), (err, stats) => {
        if (false) {
          // upload template
          deploy.createPage(`${cname}`, `${ename}.htm`, content, sitename, catelog)
            .then((ret) => {
              let pid = ret.data.id
              fs.writeFile(path.resolve(__dirname, `ids/${ename}`), pid, 'utf8', (err) => {
                if (err) throw err
                console.log('save page Id success')
              })
              console.log(chalk.green(ret.msg))
            })
        } else {
          let pid = fs.readFileSync(path.resolve(__dirname, `ids/${ename}`), 'utf8')
          console.log(chalk.green(pid))
          
          deploy.updatePage(parseInt(pid), content, sitename, catelog)
            .then((ret) => {
              console.log(chalk.green(ret.msg))
              //https://news.qq.com/70yearqa/index_test.htm
              let url = `https://yslp.qq.com/yyh5/${ename}.htm`
              console.log(chalk.green(url))
            })
        }
      })
    })
  }
}

const upload = new Upload(targetDir, 'yyh5')

const questions = [{
  type: 'confirm',
  name: 'online',
  message: 'Are your sure push to production?',
  default: () => false
}]

if (!env) {
  console.log(chalk.green('该动作会引发线上产品的运行，你确定要继续执行吗？'))
  inquirer.prompt(questions)
    .then(answers => {
      if (answers.online) {
        console.log(chalk.green('正在部署到正式环境...'))
        upload.init()
      } else {
        console.log(chalk.red.bold('部署任务取消!!!'))
      }
    })
} else {
  console.log(chalk.green('正在部署到测试环境...'))
  upload.init()
}
