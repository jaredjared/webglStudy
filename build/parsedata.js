const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const shell = require('shelljs')
class parseData {
    constructor() {
        //读取xml生成json
        let filePath = path.resolve(__dirname, '../static/maps.json');
        fs.readFile(filePath, { encoding: "utf-8" }, function (err, res) {
            //readFile回调函数
            if (err) {
                console.log(err);
            } else {
                let obj=JSON.parse(res);
                // console.log(obj.data.map);
                obj.data.map.nodes=parseToArray(obj.data.map.nodes);
                obj.data.map.heros=parseHeros(parseToArray(obj.data.map.heros));
                obj.data.map.fightback=parseLine(obj.data.map.fightback);
                obj.data.map.award=parseLine(obj.data.map.award);
                let content=JSON.stringify(obj);
                // console.log(content);
                fs.writeFile(path.resolve(path.resolve(__dirname, '../static'), 'mapdata.json'), content, 'utf8', (err) => {
                    if (err) throw err
                })
            }
        });
        //矫正array
        let parseHeros=(ary)=>{
            let list=[];
            for(let i=0;i<ary.length;i++){
                list.push({id:"",name:ary[i][0],x:ary[i][1],y:ary[i][2]});
            }
            return list;
        }
        //解析字符串变成 数组
        let parseLine=(str)=>{
            let ary=[];
            let tem='';
            for(let i=0;i<str.length;i++){
                if(str.charAt(i) == ','){
                    ary.push(tem);
                    tem='';
                }else{
                    tem+=str.charAt(i);
                }
            }
            return ary;
        }
        let parseToArray=(str)=>{
            if(str.charAt(str.length-1) == 'n'){
                str=str.slice(0,str.length-1);
            }
            let ary=[];
            let lines=[];
            let lineStr='';
            for(let i=0;i<str.length;i++){
                if(str.charAt(i) == 'n'){
                    lines.push(lineStr);
                    lineStr='';
                }else{
                    lineStr+=str.charAt(i);
                }
            }
            lines.push(lineStr);
            for(let i=0;i<lines.length;i++){
                ary.push(parseLine(lines[i]));
            }
            return ary;
        }
    }
}
new parseData();