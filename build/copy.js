const path = require('path')
const shell = require('shelljs')

class Copy{
    constructor(){
        //
        let folderPath=path.resolve(__dirname,'../static/images');
        let aimPath=path.resolve(__dirname,'../dist');
        let file=path.resolve(__dirname,'../static/data.js');
        shell.cp('-R',folderPath,aimPath);
        shell.cp('-R',file,aimPath+'/data.js');
    }
}
new Copy();