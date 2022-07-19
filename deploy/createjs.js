const fs = require('fs');
const path = require('path');
const chalk = require('chalk')
const shell = require('shelljs')

class createjs {
    constructor() {
        let ary = process.argv.splice(2);
        let fileName;
        let str;
        fileName = ary[ary.length - 2];
        str = `export default class ${fileName}{
    constructor(){
        super();
        //
    }
}`;

        let folderPath = '..'
        for (let i = 0; i < ary.length - 1; i++) {
            folderPath += '/' + ary[0];
        }
        let rootPath = path.resolve(__dirname, folderPath);
        fs.writeFile(path.resolve(rootPath, fileName.toLowerCase() + '.js'), str, 'utf8', (err) => {
            if (err) throw err
        })


    }
}
new createjs();