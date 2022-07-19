var fs = require('fs')
var path = require('path')
const deploy = require('@tencent/workflow-api')
const deployDir = path.resolve(process.cwd(), 'dist')
const inquirer = require('inquirer');
const chalk = require('chalk');
let target = 'halfyear2020';
let parent = 'yyh5';

class CreateDir {
    constructor() {
        // const questions = [{
        //     type: 'input',
        //     name: 'path',
        //     message: '请输入文件夹地址名（xxx/xxx）: '
        // },];
        // console.log(chalk.green(`栏目地址为${parent}!!!`));
        // inquirer.prompt(questions).then((answers) => {
        //     deploy.createDir(answers.path, `/${parent}`).then((res) => {
        //         // console.log(res);
        //         if (res.code === 0) {
        //             console.log(chalk.green(`创建线上静态素材目录${answers.path}成功`))
        //         }
        //     });
        // });
        let count = 0;
        let loop = () => {
            count++;
            if (count < 23) {
                deploy.createDir(`images/${count}`, `/${parent}`).then((res) => {
                    // console.log(res);
                    if (res.code === 0) {
                        console.log(chalk.green(`创建线上静态素材目录images/${count}成功`))
                        loop();
                    }
                });
            } else {
                console.log(chalk.green(`创建线上静态素材目录成功`))
            }
        }

    }
}
new CreateDir();