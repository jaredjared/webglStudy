const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const shell = require('shelljs')
const proname='double11';
class createimg {
    constructor() {
        let folder = path.resolve(__dirname, '../static/');
        let content = 'let proData =[\n';
        let folders = [];
        let imagePath='';
        
        //分析当前文件夹文件并切声成对应的pool
        let parseCurFolder=(curfolder,call)=>{
            let curPath=path.join(imagePath, `${curfolder}/`);
            // console.log(curPath);
            let curStr=`\n${curfolder}Psd:[`;
            fs.readdir(curPath, function (err, files) {
                if (err) {
                    console.warn(err)
                } else {
                    //遍历读取到的文件列表
                    files.forEach(function (filename) {
                        if (filename != '.DS_Store') {
                            //获取当前文件的绝对路径
                            let idstr = filename.replace(/.jpg|.png/, '');
                            let objstr = `{src:'${curfolder}/${filename}',id:'${idstr}'},\n`;
                            curStr += objstr;
                        }
                    });
                }
                curStr += '],\n';
                content+=curStr;
                call();
            });
        }
        //分析文件夹
        let parseFolders = () => {
            imagePath = path.join(folder, 'images/');
            fs.readdir(imagePath, function (err, files) {
                (function iterator(i) {
                    //遍历数组files结束
                    if (i == files.length) {
                        // console.log(folders);
                        content+='\n]';
                        content+='\nwindow.proData=proData;';
                        writeFile(content);
                        return;
                    }
                    //遍历查看目录下所有东西
                    fs.stat(imagePath + files[i], function (err, stats) {
                        //如果是文件夹，就放入存放文件夹的数组中
                        if (stats.isDirectory()) {
                            parseCurFolder(files[i],()=>{
                                iterator(i + 1);
                            });
                            folders.push(files[i]);
                        }else{
                            if(files[i]!=".DS_Store"){
                                let ns=files[i];
                                ns=ns.split('.')[0];
                                content+=`{src:'${files[i]}',id:'${ns}'},\n`;
                            }
                            iterator(i + 1);
                        }
                    })
                })(0)
            });
        }
        parseFolders();
        //
        let writeFile = (content) => {
            fs.writeFile(path.resolve(folder, 'imgdata.js'), content, 'utf8', (err) => {
                if (err) throw err
                let folderPath=path.resolve(__dirname,'../static/images');
                let aimPath=path.resolve(__dirname,'../dist');
                shell.cp('-R',folderPath,aimPath);
                shell.cp('-R',path.resolve(__dirname,'../libs'),aimPath);
                // shell.mkdir(path.resolve(__dirname,'../static/snd'),aimPath);
                shell.cp('-R',path.resolve(__dirname,'../static/snd'),aimPath);
                //mv
                // shell.cp('-R',path.resolve(__dirname,'../static/models'),aimPath);
                // shell.cp('-R',path.resolve(__dirname,'../static/resultimg'),aimPath);
                // shell.cp('-R',path.resolve(__dirname,'../static/font'),aimPath);
                // shell.cp('-R',path.resolve(__dirname,'../static/data'),aimPath);
            })
        }

    }
}
new createimg();