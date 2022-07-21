/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__webBase__ = __webpack_require__(1);


const readline=(str)=>{
  return str;
}

class Main {
    constructor() {
      // new DiffForInAndOf();
      // arrMap();
      Object(__WEBPACK_IMPORTED_MODULE_0__webBase__["a" /* extendsTypes */])();
    }
}
/* harmony export (immutable) */ __webpack_exports__["default"] = Main;

window.onload = () => {
    new Main();
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export DiffForInAndOf */
/* unused harmony export arrMap */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return extendsTypes; });
const DiffForInAndOf=function(){
  //for in 和 for of的区别
  const arr=[5,4,3,2,1];
  for(let i in arr){
    console.log(i,arr[i]);// 0,1,2,3,4 输出的是下标index
  }

  for(let i of arr){
    console.log(i);// 5,4,3,2,1 输出的是对应的值value
  } 
}

const arrMap=function(){
  const arr=[1,2,3];
  const arr2=arr.map(i=>i+1);
  console.log(arr,arr2);

  console.log(arr.every(i=>i<=5));
}
// 继承的几种方式
const extendsTypes=()=>{
  console.log(1)
}
//数组去重
const arrayReduce=()=>{
  const arr=[1,2,3,4,2,1,5,6];
  //splice
  //使用对象属性不能相同的特点
  //对原数组排序，然后循环

  console([...new Set(arr)]);
}

const dataJudgeType=()=>{
  // typeof 一元运算符 可以不跟括弧
  // Object.prototype.toString().call();
  // contructor isArray
  const getType = (value) => {
      const type = typeof value;  
      if (type === 'undefined' || type === 'number' || value === null) return type;  
      if (value.constructor === String) return 'string';  
      if (value.constructor === Boolean) return 'boolean';  
      if (value.constructor === Object) return 'object';  
      if (value.constructor === Function) return 'function';  
      if (value.constructor === AsyncFunction) return 'asyncFunction';  
      if (value.constructor === GeneratorFunction) return 'generatorFunction';  
      if (value.constructor === Symbol) return 'symbol';  
      if (value.constructor === Array) return 'array';  
      if (value.constructor === Date) return 'date';  
      if (value.constructor === RegExp) return 'regExp';  
      if (value.constructor === Map) return 'map';  
      if (value.constructor === WeakMap) return 'weakMap';  
      if (value.constructor === Set) return 'set';  
      if (value.constructor === WeakSet) return 'weakSet';  
      if (value.constructor === Blob) return 'blob';  
      if (value.constructor === Uint8Array) return 'uint8Array';  
      if (value.constructor === Error) return 'error';  
    }
}



/***/ })
/******/ ]);