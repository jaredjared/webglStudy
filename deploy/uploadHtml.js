const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');
const deploy = require('@tencent/workflow-api');
const proData = require('./config');
class uploadHtml {
    constructor() {
        let cname = proData.procname;
        let sitename = proData.sitename;
        let catelog = proData.catelog;
        //
        let dist = path.resolve(__dirname, '../dist/');

        let pageURL = `${cname}.html`;
        // console.log(chalk.blue(pageURL));
        let content = fs.readFileSync(path.resolve(dist, pageURL), 'utf8');
        let pid = fs.readFileSync(path.resolve(__dirname, `ids/${cname}`), 'utf8');
        console.log(chalk.green(pid));
        deploy.updatePage(parseInt(pid), content, sitename, catelog)
            .then((ret) => {
                console.log(chalk.green(ret.msg))
                let url = `https://${sitename}.qq.com/${catelog}/${cname}.htm`
                console.log(chalk.green(url))
            })

    }
};
new uploadHtml();