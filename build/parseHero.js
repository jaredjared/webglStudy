const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const shell = require('shelljs')
class parseHero {
    constructor() {
        //读取xml生成json
        let filePath = path.resolve(__dirname, '../static/data/heros.json');
        fs.readFile(filePath, { encoding: "utf-8" }, function (err, res) {
            //readFile回调函数
            if (err) {
                console.log(err);
            } else {
                let obj=JSON.parse(res);
                console.log(obj.data);
                parseAry(obj.data.heros.hero);
                let ary=obj.data.heros.hero;
                let newObj={};
                for(let i=0;i<ary.length;i++){
                    ary[i].id=i;
                    newObj[i]=ary[i];
                }
                let content=JSON.stringify(newObj);
                // // console.log(content);
                fs.writeFile(path.resolve(path.resolve(__dirname, '../static/data'), 'heros.json'), content, 'utf8', (err) => {
                    if (err) throw err
                })
            }
        });
       
    }
}
new parseHero();