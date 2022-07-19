let fs=require('fs');
let uglifyjs=require('uglify-js');
// let uglifyjs=require('uglifyjs-webpack-plugin');
let path=require('path');
let result=uglifyjs.minify('../test/data.js');