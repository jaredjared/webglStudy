const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const shell = require('shelljs')

class CreateImgData {
    constructor() {
        let aimFolder = path.resolve(__dirname, '../static/images');
        let originFolder = path.resolve(__dirname, '../static/origin');
        let finalData = {};
        let content = ``;
        let loadContent = `let imgsData =[\n`;
        //
        let parseCurFolder = (curfolder, call) => {
            let curPath = path.join(originFolder, `${curfolder}/`);
            let curStr = ``;
            // console.log(curPath);
            let obj = {};
            let w = [];
            let c = [];
            let t = [];
            let e = [];

            fs.readdir(curPath, function (err, files) {
                if (err) {
                    console.warn(err)
                } else {
                    //遍历读取到的文件列表
                    // console.log(files);
                    files.forEach(function (filename) {
                        if (filename != '.DS_Store') {
                            //获取当前文件的绝对路径
                            // console.log('filename:',filename)
                            let fname = filename.replace(/.jpg|.png/, '');
                            let idstr = curfolder + '_' + fname;

                            if (idstr.match('c')) {
                                c.push({ src: `${curfolder}/${filename}`, id: idstr });
                            }
                            if (idstr.match('w')) {
                                w.push({ src: `${curfolder}/${filename}`, id: idstr });
                            }
                            if (idstr.match('t')) {
                                t.push({ src: `${curfolder}/${filename}`, id: idstr });
                            }
                            if (idstr.match('e')) {
                                e.push({ src: `${curfolder}/${filename}`, id: idstr });
                            }
                            if (idstr.match('bg')) {
                                obj[fname] = { src: `${curfolder}/${filename}`, id: idstr };
                            }
                            curStr += `{src:'${curfolder}/${filename}',id:'${idstr}'},\n`;
                        }
                    });
                }
                obj.w = w;
                obj.c = c;
                obj.t = t;
                obj.e = e;
                // curStr += '},\n';
                loadContent += curStr;
                call(obj);
            });
        }
        //分析文件夹
        let parseFolders = () => {
            console.log('step 1')
            fs.readdir(originFolder, function (err, files) {
                (function iterator(i) {
                    if (i == files.length) {
                        // writeFile(content);
                        content = `var originData=` + JSON.stringify(finalData);
                        loadContent += ']';
                        console.log(loadContent);
                        fs.writeFile(path.resolve(originFolder, 'imgdata.js'), content, 'utf8', (err) => {
                            if (err) throw err
                        });
                        fs.writeFile(path.resolve(originFolder, 'loaddata.js'), loadContent, 'utf8', (err) => {
                            if (err) throw err
                        });

                        return;
                    }
                    //遍历查看目录下所有东西
                    fs.stat(originFolder + "/" + files[i], function (err, stats) {
                        //如果是文件夹，就放入存放文件夹的数组中
                        if (stats.isDirectory()) {
                            parseCurFolder(files[i], (obj) => {
                                finalData[files[i]] = obj;
                                iterator(i + 1);
                            });
                            // console.log('files[i]', files[i]);
                            // folders.push(files[i]);
                        } else {
                            // if(files[i]!=".DS_Store"){
                            //     let ns=files[i];
                            //     ns=ns.split('.')[0];
                            //     content+=`{src:'${files[i]}',id:'${ns}'},\n`;
                            // }
                            iterator(i + 1);
                        }
                    })
                })(0)
            });
        }
        parseFolders();
    }
}
new CreateImgData();