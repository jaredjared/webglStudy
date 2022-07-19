const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const deploy = require('@tencent/workflow-api');
const proData = require('./config');

class CreateHtml {
    constructor() {
        let cname = proData.procname;
        let sitename = proData.sitename;
        let catelog = proData.catelog;
        let content = `<html>${cname}</html>`;
        
        console.log(chalk.green(`栏目地址为${catelog}!!!`));
        let createPro = () => {
            deploy.createPage(`${cname}`, `${cname}.htm`, content, sitename, catelog)
                .then((ret) => {
                    console.log('???:', ret);
                    let pid = ret.data.id
                    fs.writeFile(path.resolve(__dirname, `ids/${cname}`), pid, 'utf8', (err) => {
                        if (err) throw err
                        console.log('save page Id success');
                        createTest();
                    })
                    console.log(chalk.green(ret.msg))
                });
        }
        let createTest = () => {
            deploy.createPage(`${cname}`, `${cname}_test.htm`, content, sitename, catelog)
                .then((ret) => {
                    console.log('???:', ret);
                    let pid = ret.data.id
                    fs.writeFile(path.resolve(__dirname, `ids/${cname}_test`), pid, 'utf8', (err) => {
                        if (err) throw err
                        console.log('save page Id success');
                    })
                    console.log(chalk.green(ret.msg))
                });
        }
        createPro();
        //
    }
}
new CreateHtml();