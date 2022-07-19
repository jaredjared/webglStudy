const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const inquirer = require('inquirer')
const deploy = require('@tencent/workflow-api')

const questions = [{
  type: 'input',
  name: 'user',
  message: 'Please input your RTX: '
}, {
  type: 'password',
  name: 'pwd',
  mask: '*',
  message: 'Please inpout your Pin + Token: '
}]
function storeCookie (ticket, user, sitename) {
  let now = new Date()
  let time = now.getTime()
  now.setTime(time + 60 * 60 * 24 * 30)
  let expires = now.toGMTString()

  const sign = {
    'webdev.com': {
      '/': {
        'PAS_COOKIE_TICKET': {
          'domain': 'webdev.com',
          'path': '/',
          'key': 'PAS_COOKIE_TICKET',
          'value': `${ticket}`,
          'hostOnly': false,
          'Expires': `${expires}`
        },
        'PAS_COOKIE_USER': {
          'domain': 'webdev.com',
          'path': '/',
          'key': 'PAS_COOKIE_USER',
          'value': `${user}`,
          'hostOnly': false,
          'Expires': `${expires}`
        },
        'sitename': {
          'domain': 'webdev.com',
          'path': '/',
          'key': 'sitename',
          'value': `${sitename}`,
          'hostOnly': false,
          'Expires': `${expires}`
        },
        'PAS_COOKIE_SITENAME': {
          'domain': 'webdev.com',
          'path': '/',
          'key': 'PAS_COOKIE_SITENAME',
          'value': `${sitename}`,
          'hostOnly': false,
          'Expires': `${expires}`
        },
        'editor_mode': {
          'domain': 'webdev.com',
          'path': '/',
          'key': 'editor_mode',
          'value': '0',
          'hostOnly': false,
          'Expires': `${expires}`
        }
      }
    }
  }

  fs.stat(path.resolve(__dirname, 'cookie.json'), (err, stat) => {
    if (err) {
      fs.writeFile(path.resolve(__dirname, 'cookie.json'), JSON.stringify(sign, null, 2), 'utf8', (err) => {
        if (err) throw err

        console.log('create Cookie success!')
      })
    } else {
      fs.writeFile(path.resolve(__dirname, 'cookie.json'), JSON.stringify(sign, null, 2), 'utf8', (err) => {
        if (err) throw err
        console.log('update Cookie success!')
      })
    }
  })
}

inquirer.prompt(questions).then((answers) => {
  deploy.login(answers.user, answers.pwd)
    .then((ret) => {
      if (ret.code === 0) {
        let data = ret.data
        let ticket = data.cookie['PAS_COOKIE_TICKET']
        let user = data.cookie['PAS_COOKIE_USER']

        storeCookie(ticket, user, 'yslp')
      } else {
        console.log(chalk.red('用户名或密码错误'))
      }
    })
})
