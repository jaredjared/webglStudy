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

export {
  DiffForInAndOf,
  arrMap
}