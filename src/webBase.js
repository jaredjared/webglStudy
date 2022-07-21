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
  // 原型链继承
  const type1=()=>{
    function Parent(){
      this.parentPrototype='parentPrototype';
      this.parentObj={
        info:"my name is parent"
      };
    }
    function Children(){}
    Children.prototype=new Parent();
    const a=new Children();
    console.log(a.parentObj,a.parentPrototype);
    const b=new Children();
    a.parentObj.info='aaa';
    console.log(a.parentObj,a.parentPrototype);
  }
  // type1();
  // 构造函数继承
  const type2=()=>{
    function Parent(){
      this.parentPrototype='parentPrototype';
      this.obj={
        info:'parent obj info'
      };
    }

    function Children(){
      Parent.call(this);
    }
    const a=new Children();
    console.log(a.parentPrototype);

    const b=new Children();
    a.obj.info='aaaa';
    console.log(b.obj.info);
  }
  // type2();
  // 组合继承
  const type3=()=>{
    function Parent(){
      this.parentPrototype='parent';
    }
    Parent.prototype.fn=function(){
      console.log('method on p');
    }

    function Children(){
      Parent.call(this);
    }

    Children.prototype=new Parent();
    const c=new Children();
    console.log(c.parentPrototype);
    c.fn();
  }
  // type3();
  // 原型式继承
  const type4=()=>{
    function objFn(o){
      o.objPrototype='o prototype';
      function F(){}
      F.prototype=0;
      return new F();
    }
  }
  // 寄生继承
  const type5=()=>{
    function createObj(obj){
      let clone=Object.assign(obj);
      clone.prototype1='my 1';
      return clone;
    }

    const P={
      parentPrototype:'P prototype'
    };

    const c=createObj(P);
    console.log(c.prototype1);
  }
  type5();
  // 寄生+组合继承
  const type6=()=>{
    function inherProto(superType,subType){
      let proto=Object.create(superType.prototype);
      subType.prototype=proto;
      proto.constructor=subType;
    }

    function Super(){
      this.superProto='super proto';
      this.colors=['red','blue'];
    }

    function Sub(){
      this.subProto='sub proto';
      this.name='sub name';
      Super.call(this);
    }

    Super.prototype.getName=function(){
      console.log(this.name);
    }

    inherProto(Super,Sub);

    let a=new Sub();
    console.log(a.getName());

  }
  type6();
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

export {
  DiffForInAndOf,
  arrMap,
  extendsTypes
}