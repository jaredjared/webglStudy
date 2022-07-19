const fs = require('fs');
const path = require('path');
const proData=require('../deploy/config');
class ParseHtml {
    constructor() {
        let htmlname=proData.procname;
        let filePath = path.resolve(__dirname, `../dist/${htmlname}.html`);
        //
        String.prototype.splice = function(start, newStr) {
            return this.slice(0, start) + newStr + this.slice(start);
        };
        //
        fs.readFile(filePath, { encoding: "utf-8" }, function (err, res) {
            //readFile回调函数
            if (err) {
                console.log(err);
            } else {
                //console.log(res.match(/type=/));
                let index=res.match(`type="text/javascript"`).index;
                let insertStr=' charset="utf-8" ';
                let str=res.splice(index,insertStr);
                //let path= '../images/';
                //https://mat1.gtimg.com/yslp/yyh5/double11/images/
                let olpath=`https://mat1.gtimg.com/yslp/yyh5/${htmlname}/`;
                let libspath=`https://mat1.gtimg.com/yslp/yyh5/${htmlname}/libs`;
                let reg='../';
                str=str.replace(reg, olpath);
                //
                let reg2=RegExp('./libs','g');
                str=str.replace(reg2,libspath);
                // console.log(str);
                fs.writeFile(path.resolve(path.resolve(__dirname, '../dist'), `${htmlname}.html`), str, 'utf8', (err) => {
                    if (err) throw err
                });
                fs.writeFile(path.resolve(path.resolve(__dirname, '../dist'), `${htmlname}_test.html`), str, 'utf8', (err) => {
                    if (err) throw err
                })
            }
        });
    }
}
new ParseHtml();
