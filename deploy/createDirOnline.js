const rootPath = '../dist/';
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const deploy = require('@tencent/workflow-api')
const proData = require('./config');
let parent = 'zt2020/page';
class CreateDirOnline {
    constructor() {
        /**
         * 根据项目名生成根目录
         */
        parent=proData.catelog;
        
        let proName = proData.procname;
        console.log(parent,proName);
        let folder = path.resolve(__dirname, rootPath);
        let createRootDir = () => {
            deploy.createDir(`${proName}`, `/${parent}`).then((res) => {
                // console.log(res);
                if (res.code === 0) {
                    console.log(chalk.green(`创建线上静态素材根目录${proName}成功`));
                    chackRootFolder();
                }
            });
        }
        createRootDir();
        //遍历根目录
        let chackRootFolder = () => {
            fs.readdir(folder, function (err, files) {
                (function iterator(i) {
                    //遍历数组files结束
                    if (i == files.length) {
                        console.log(chalk.green('Root folder is ok.'));
                        parseFolders();
                        return;
                    }
                    //遍历查看目录下所有东西
                    fs.stat(folder + '/' + files[i], function (err, stats) {
                        //如果是文件夹，就放入存放文件夹的数组中
                        // console.log(err);
                        if (stats.isDirectory()) {
                            //创建线上文件夹
                            createSubFolder(files[i], () => {
                                iterator(i + 1);
                            });
                        } else {
                            iterator(i + 1);
                        }
                    })
                })(0)
            });
        }
        //
        let createSubFolder = (folder, call) => {
            deploy.createDir(`${proName}/${folder}`, `/${parent}`).then((res) => {
                // console.log(res);
                if (res.code === 0) {
                    console.log(chalk.green(`创建线上目录${proName}/${folder}成功`));
                    uploadStatic(folder).then((ret)=>{
                        call();
                    });
                    
                }
            });
        }
        //
        let uploadStatic = (curFolder) => {
            console.log(chalk.red('img uploading......'))
            const staticDir = folder + '/' + curFolder;
            const rootFolderOL=`${parent}/${proName}/${curFolder}`;
            // console.log(chalk.green(staticDir));
            // console.log(chalk.green(rootFolderOL));
            return new Promise((resolve, reject) => {
                fs.readdir((staticDir), 'utf8', (err, files) => {
                    if (err) throw err

                    const promiseAll = []
                    files.map((file, index, context) => {
                        // console.log(file);
                        let promiseFile = deploy.addMaterial(`${staticDir}/${file}`, `${rootFolderOL}`);
                        promiseAll.push(promiseFile);
                    })
                    Promise.all(promiseAll)
                        .then((rets) => {
                            rets.map((ret, index, context) => {
                                console.log(chalk.red(ret.msg))
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
        //parse js folder
        let parseJsFolder = () => {
            let imagePath = path.join(folder, 'js/');
            fs.readdir(imagePath, function (err, files) {
                (function iterator(i) {
                    //遍历数组files结束
                    if (i == files.length) {
                        console.log(chalk.green('JS folder is ok.'));
                        return;
                    }
                    //遍历查看目录下所有东西
                    fs.stat(imagePath + files[i], function (err, stats) {
                        //如果是文件夹，就放入存放文件夹的数组中
                        if (stats.isDirectory()) {
                            //创建线上文件夹
                            createSubFolder(files[i], () => {
                                iterator(i + 1);
                            });
                        } else {
                            iterator(i + 1);
                        }
                    })
                })(0)
            });
        }
        //parse images folder
        let parseFolders = () => {
            let imagePath = path.join(folder, 'images/');
            fs.readdir(imagePath, function (err, files) {
                (function iterator(i) {
                    //遍历数组files结束
                    if (i == files.length) {
                        console.log(chalk.green('Images folder is ok.'));
                        parseJsFolder();
                        return;
                    }
                    //遍历查看目录下所有东西
                    fs.stat(imagePath + files[i], function (err, stats) {
                        //如果是文件夹，就放入存放文件夹的数组中
                        if (stats.isDirectory()) {
                            //创建线上文件夹
                            createSubFolder(files[i], () => {
                                iterator(i + 1);
                            });
                        } else {
                            iterator(i + 1);
                        }

                    })
                })(0)
            });
        }
        //
    }
}
new CreateDirOnline();