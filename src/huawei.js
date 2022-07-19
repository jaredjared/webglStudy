 class huawei{

 // 求最小公倍数
 HJ108(){
  let n=readline().split(' ').map(Number);
  //最大公因数*最小公倍数==两数乘积(公式法)//使用递归
  // let gys=(a,b)=>  a==b?  a : a>b? gys(b,a-b) : gys(a,b-a)
  // print( n[0]*n[1] / gys(n[0],n[1]) )
  //遍历小于两个数乘积的数(常规方法)
  //找到第一个可以同时整除两个数的便是最小公倍数
  for(let i=n[1];i<=n[0]*n[1];i++){
      if(i%n[0]==0 && i%n[1]==0) {
          print(i);
          break
      }
  }
}
// 求解立方根
HJ107(){
  let str=readline()
  // const res=Math.cbrt(str).toFixed(1)   函数方法  可惜不让用哇
  // console.log(res)
  let num=0
  function cal(str){
      str=Math.abs(str)
      if(num*num*num<=str){
          num+=0.01
          cal(str)
      }else{
      return num
      }
  }
  cal(str)
  console.log(str>=0?num.toFixed(1):-num.toFixed(1))
}
// Redraiment的走法
HJ103(){
  readline()
  const arr=readline().split(' ').map(item=>parseInt(item))
  const res=[]
  arr.forEach((item,idx)=>{
      let maxStep=0
      for(let i=0;i<idx;i++){
          if(arr[i]<item && res[i]>maxStep){ maxStep=res[i]}
      }
      res.push(maxStep+1)
  })
  print(Math.max(...res))
}
// 等差数列
HJ100(){
  while ((line = readline())) {
    const arr = [2];
    for (let i = 1; i < line; i++) {
      arr.push(arr[i - 1] + 3);
    }
    console.log(
      arr.reduce((total, item) => total + item, 0)
    );
  }
}
// 自守数
HJ99(){
  while (num = readline()) {
    let count = 0
    for (let i = 0; i <= Number(num); i++) {
      if (((i * i) + '').endsWith(i + '')) {
        count++
      }
    }
    print(count)
  }
  
}
// 自动售货系统
HJ98(){
  const indexToTypes = {
    0: 'A1',
    1: 'A2',
    2: 'A3',
    3: 'A4',
    4: 'A5',
    5: 'A6'
}
const indexToChangeTypes = {
    0: '1',
    1: '2',
    2: '5',
    3: '10'
}
const prices = {
    'A1': 2,
    'A2': 3,
    'A3': 4,
    'A4': 5,
    'A5': 8,
    'A6': 6
}
while(line = readline()) {
    const str = line.split(';');
    let balance = 0;
    const goods = {};
    const changes = {};
    let count = 0;
    
    for(let i = 0; i < str.length; i++) {
        const temp = str[i].split(' ');
        // 初始化命令获得商品和存钱数
        if(temp[0] == 'r') {
            let cgs = temp[1].split('-');
            let ccs = temp[2].split('-');
            for(let j = 0; j < cgs.length; j++) {
                const num = parseInt(cgs[j]);
                count += num
                goods[indexToTypes[j]] = num
            }
            for(let j = 0; j < ccs.length; j++) {
                changes[indexToChangeTypes[j]] = parseInt(ccs[j])
            }
            print('S001:Initialization is successful')
        } else if(temp[0] == 'c') {
            // 针对balance 进行货币计算
            if(balance == 0) {
                print("E009:Work failure")
            } else {
                // 退币原则
                const res = [];
             
                for(let j = 3; j >= 0; j--) {
                    const p = parseInt(indexToChangeTypes[j]);
                    // 需要p面额的多少张
                    const count = Math.floor(balance / p);
                    //print(count, changes[p])
                    if(count >= changes[p]) {
                        balance -= p * parseInt(changes[p]);
                        res.push(changes[p]);
                        
                    } else {
                        res.push(count);
                        balance -= p * count;
                    }
                }
                for(let j = 3; j >= 0; j--) {
                    print(`${indexToChangeTypes[3-j]} yuan coin number=${res[j]}`)
                }
                
            }
        } else if(temp[0] == 'b') {
            // 开始购物
            if(prices[temp[1]]) {
                const price = prices[temp[1]];
                if(goods[temp[1]] == 0) {
                    print("E007:The goods sold out")
                } else if(balance >= price) {
                    balance -= price
                    print('S003:Buy success,balance=' + balance)
                } else {
                    print('E008:Lack of balance')
                }
            } else {
                print("E006:Goods does not exist")
            }
            
        } else if(temp[0] == 'p') {
            // p 钱币面额  进行投币  如果货物为空，禁止投币
            const money = parseInt(temp[1])
            if(money != 1 && money != 2 && money != 5 && money != 10 ) {
                print("E002:Denomination error")
            } else if(count === 0) {
                print("E005:All the goods sold out")
            } else if(money <= 2) {
                balance += parseInt(temp[1])
                const key = Object.keys(changes).filter(o => changes[o] == money)[0]
                changes[key] += 1
                print("S002:Pay success,balance=" + balance)
            } else if(parseInt(changes[1]) + 2 * parseInt(changes[2]) < parseInt(temp[1])) {
                print("E003:Change is not enough, pay fail")
            } else {
                balance += parseInt(temp[1])
                const key = Object.keys(changes).filter(o => changes[o] == money)[0]
                changes[key] += 1
                print("S002:Pay success,balance=" + balance)
            }
        } else if(str[i][0] == 'q') {
            if(temp[1] == '0') {
                Object.keys(goods).map(o => ({
                    name: o,
                    count: goods[o],
                    price: prices[o]
                })).sort((a, b) => a.count == b.count ? b.name - a.name : b.count - a.count).forEach(k => print(`${k.name} ${k.price} ${k.count}`))
            } else if(temp[1] == '1') {
                Object.keys(changes).forEach(k => print(`${k} yuan coin number=${changes[k]}`))
            } else {
                print("E010:Parameter error")
            }
        }
    }
    // r 任一阶段可以重置系统状态
    // p 钱币面额
    // b  购买商品
    // c  退币
}

}
// 记负均正
HJ97(){
  while(total = readline()) {
    const line = readline();
    const arr = line.split(' ');
    const len = arr.filter(v => parseInt(v) < 0).length;
    const zArr = arr.filter(v => v > 0);
    if(zArr.length == 0) {
        console.log('0 0.0');
        break;
    }
    const sum = zArr.reduce((preV, curV) => parseInt(preV) + parseInt(curV));
    const jun = (sum / zArr.length).toFixed(1);
    console.log(len + ' ' + jun);
}

}
// 表示数字
HJ96(){
  let str;
  while(str = readline()){
    str = str.replace(/[0-9]+/g, (val) => '*' + val + '*');
    console.log(str);
  }
}
// 人民币转换
HJ95(){
  let line;

  function getFirst(num){
      let length = Math.ceil(num.length / 4);
      let first = num.length % 4 == 0 ? 4 : num.length % 4
      let explain = '';
      let hasAdd = false
      let canAdd = hasZero(num)
    
      for(let i = 0;i< length;i++){
          hasAdd = explain.indexOf('零') > -1
          let cur = num.substring(first+(i-1)*4,first + (i)*4);
        
          let str = getChina(cur,length - i,canAdd,hasAdd);
          explain+= str
      }
      return explain
  }
  function getNext(num){
      let explain = '';
      let chinaArr = '壹,贰,叁,肆,伍,陆,柒,捌,玖'.split(',');
      if(Number(num) == 0){
          explain+='整'
      }else{
          let arr = num.split('');
          let index = 0
          for(let i of arr){
          if(i != '0' && index == 0){
                explain+=chinaArr[(Number(i) - 1)] + '角'
            }else if(i != '0' && index == 1){
                explain+=chinaArr[(Number(i) - 1)] + '分'
            }
              index++
          }
      }
      return explain
  }
  function hasZero(num){
      let flag = false
      if(num.length == 1){
              flag = false
          }else{
              flag =  num.includes('0')
        }
      return flag
  }
  function getChina(num,stage,canAdd,hasAdd){
      let chinaArr = '壹,贰,叁,肆,伍,陆,柒,捌,玖'.split(',');
      let arr = num.split('');
      let str = ''
      let step = arr.length
      for(let i of arr){
          if(i != '0'){
              if(step == 4){
              str+=chinaArr[(Number(i) - 1)] + '仟'
              }else if(step == 3){
                  str+=chinaArr[(Number(i) - 1)] + '佰'
              }else if(step == 2){
                  if((Number(i) - 1)!=0){
                      str+=chinaArr[(Number(i) - 1)] + '拾'
                  }else{
                      str+= '拾'
                  }
                  
              }else if(step == 1){
                  str+=chinaArr[(Number(i) - 1)]
              }
          }else{
              if(canAdd && !hasAdd ){
                str+= '零'
                hasAdd = true
              }
          }
          step--
      }
      if(stage % 3 == 0){
          str+='亿'
      }else if(stage % 3 == 2 ){
          str+='万'
      }
  //     console.log(str)
      str = str.replace('零万','万零')
      return str
  }

  while(line = readline()){
      let numArr = line.split('.');
  //     两位但是后面的不是零      
      let fisrt = getFirst(numArr[0]);
      let next =  getNext(numArr[1]);
      let hasYuan = numArr[0].length > 1 || numArr[0].length == 1 && Number(numArr[0]) !=0
      console.log(`人民币${fisrt}${hasYuan ?'元':''}${next}`)
  }





}
// 记票统计
HJ94(){
  let str;
  while(str = readline()){
    let people = readline();
    let laji = readline();
    let piao = readline();

    let sum=0,res={};
    let pArr = people.split(' ');
    let piArr = piao.split(' ');
    for(let v in piArr){
      if(pArr.includes(piArr[v])){
        if(res[piArr[v]]){
          res[piArr[v]]++;
        }else{
          res[piArr[v]] = 1;
        }
      }else{
        sum++;
      }
    }

    for(let v of pArr){
      if(res[v]){
        console.log(v+' :'+' '+res[v]);
      }else{
        console.log(v+' :'+' 0');
      }
    }
    console.log('Invalid :'+' '+sum);
  }
}
// 数组分组
HJ93(){
  //参考网友ld1230的解法
  //思想：将能整除3或者5的各自分为一组，记为sum1和sum2，剩余的保存在数组nums里
  //现有两组，剩余nums里的数要么在sum1里要么在sum2里，利用递归依次放在sum1和sum2中
  //最终nums里的数字全部放进去，若sum1 == sum2，则返回true，否则，返回false
  let str;
  while(str = readline()){
    let num = readline();
    let arr = num.split(' ');
    let three = arr.filter((v)=>{
      return v%3==0 && v%5!=0;
    })

    let five = arr.filter((v)=>{
      return v%5==0;
    })

    let other = arr.filter((v)=>{
      return v%5!=0 &&v%3!=0;
    })
    //所有三的倍数的数字的和
    let tsum = three.reduce((pre,cur)=>{
      return pre+cur*1;
    },0)
    //所有五的倍数的数字的和
    let fsum = five.reduce((pre,cur)=>{
      return pre+cur*1;
    },0)

    console.log(isExists(tsum,fsum,other,0))
  }

  function isExists(sum1,sum2,nums,index){
      if(index == nums.length && sum1 != sum2) return false;
      if(index == nums.length && sum1 == sum2) return true;
      if(index < nums.length) return isExists(sum1+parseInt(nums[index]), sum2, nums, index+1) || isExists(sum1, sum2+parseInt(nums[index]), nums, index+1);
      return false;
  }
}
// 在字符串中找出连续最长的数字串
HJ92(){
  while(line = readline()){
    deal(line);
}

function deal(s) {
    var arr = s.match(/[0-9]+/g);
    var len = [];
    arr.forEach(item => {
        len.push(item.length);
    })
    var maxLen = Math.max(...len);
    var res = '';
    arr.forEach(item=>{
        if(item.length == maxLen) {
            res+= item;
        }
    })
    console.log(res+','+maxLen);
}


}
// 走方格的方案数
HJ91(){
  let line;
  while(line = readline()) {
      let [n, m] = line.split(' ').map(e => parseInt(e));
      console.log(solution(n, m));
  }
  /**
   *动态规划求解：
  * dp[i-1][j-1] = dp[i-1][j] + dp[i][j-1];
  * 例如：2x2网格
    (6)----(3)----(1)
    |       |      |
  * (3)----(2)----(1)
    |       |      |
    (1)----(1)----(1)
    每个顶点标注其到达网格右下角的方案总数（括弧里面的数）
    依题意最后一行和最后一列顶点方案数都是1
    其它顶点的方案数等于右边和下面直接相邻的顶点方案数之和
    即：
    第(i-1，j-1)结点的方案数计算如下图：
      i-1,j-1 (A)----(B) i-1, j
              |       |
      i, j-1  (C)----(D) i, j
      A = B + C
  */
  function solution(n, m) {
      let dp = new Array(n+1).fill(0).map(() => new Array(m+1));
      for(let i = 0;  i <= n; i++) {
          dp[i][m] = 1;
      }
      for(let j = 0;  j <= m; j++) {
          dp[n][j] = 1;
      }   
      for(let i = n; i > 0; i--) {
          for(let j = m; j > 0; j--) {
              dp[i-1][j-1] = dp[i-1][j] + dp[i][j-1];
          }
      }
      return dp[0][0];
  }
}
// 合法IP
HJ90(){
  while(str=readline()){
    let strArr=str.split('.')
    let res='YES';
    //ipv4 不能大于255不能小于0；
    //多个字符不能以0开头，只有一个字符可以是0
    //每个字符不能是除0~9以外的字符
    if(strArr.length!==4){res='NO'}else{
        for(let i=0;i<strArr.length;i++){
        let el=strArr[i]
         if(!el||Number(el)>255||Number(el)<0){
             //每一项不能小于0或大于255
            res='NO'
            break;
        }else{
            //遍历每一个字符
            for(let s=0;s<el.length;s++){
                let f=el.charCodeAt(s);
                //多个数字，以0开头不行
                if((s==0&&el[s]==0&&el.length>1)||f<48||f>57){
                    res='NO'
                    break
                }
            }
        }
    }
    }
    
    console.log(res)
}
}
// 24点运算
HJ89(){
  const d = { 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, J: 11, Q: 12, K: 13, A: 1, 2: 2 }
  const res = []
  function f(nums, target) {
    if (nums.length == 1) {
      if (d[nums[0]] == target) {
        res.push(nums[0])
        return true
      } else {
        return false
      }
    }
    for (let i = 0; i < nums.length; i++) {
      const a = nums[i]
      const b = nums.slice(0, i).concat(nums.slice(i + 1))
      if (f(b, target + d[a])) {
        res.push('-' + a)
        return true
      } else if (f(b, target - d[a])) {
        res.push('+' + a)
        return true
      } else if (f(b, target * d[a])) {
        res.push('/' + a)
        return true
      } else if (target % d[a] === 0 && f(b, target / d[a])) {
        res.push('*' + a)
        return true
      }
    }
    return false
  }
  function get24(str) {
    var nums = str.split(' ')
    if (nums.includes('joker') || nums.includes('JOKER')) {
      console.log('ERROR')
    } else {
      if (f(nums, 24)) {
        console.log(res.join(''))
      } else {
        console.log('NONE')
      }
    }
  }
  get24(readline())

}
// 扑克牌大小
HJ88(){
  let input=readline()
  let data=['2','3','4','5','6','7','8','9','10','J','Q','K','A','2','joker','JOKER']
  let [l,r] = input.split('-')
  let left=l.split(' ')
  let right=r.split(' ')
  // 判断王炸
  if(l=='joker JOKER'||r=='joker JOKER'){
      console.log('joker JOKER')
  }else{
      if(left.length==right.length){
  //         console.log(data.indexOf(left[0]),left[0])
  //         console.log(data.indexOf(right[0]),right[0])
          if(data.indexOf(left[0])>data.indexOf(right[0])){
              console.log(l)
          }else{
              console.log(r)
          }
      }else{
          if(left.length==4){
              console.log(l)
          }else if(right.length==4){
              console.log(r)
          }else{
              console.log('ERROR')
          }
      }
  }

}
// 密码强度等级
HJ87(){
  function solution(str){
    let score = 0;
    
    // 密码长度   
    if(str.lenght <= 4){
        score += 5
    }else if(str.length <= 7){
        score += 10
    }else {
        score += 25
    }
    let lowerCaseCharNum = 0; //英文小写字母
    let upperCaseCharNum = 0; //英文大写字母
    let numberNum = 0; //数字个数
    let otherNum = 0; //符号
    
    // 每种字符可能的长度
    for(let i=0; i<str.length; i++){
        let char = str.charAt(i)  
        if(/[a-z]/.test(char)){
            lowerCaseCharNum++;
        }else if(/[A-Z]/.test(char)){
            upperCaseCharNum++
        }else if(/[1-9]/.test(char)){
            numberNum++;
        }else if(isOtherChar(char)){
            otherNum++;
        }
    }
    
    // 字母
    if(!lowerCaseCharNum && !upperCaseCharNum){
        score += 0
    }else if(lowerCaseCharNum && upperCaseCharNum){
        score += 20
    }else{
        score += 10
    }
    
    // 数字
    if(numberNum === 1){
        score += 10
    }else if(numberNum > 1){
        score += 20
    }
    
    // 符号
    if(otherNum === 1){
        score += 10
    }else if(otherNum > 1){
        score += 25
    }
    
    // 奖励
    if(lowerCaseCharNum && upperCaseCharNum && numberNum && otherNum){
        score += 5
    }else if((lowerCaseCharNum || upperCaseCharNum) && numberNum && otherNum){
        score += 3
    }else if((lowerCaseCharNum || upperCaseCharNum) && numberNum){
        score += 2
    }
    
    if(score>=90){
        return 'VERY_SECURE'
    }else if(score>=80){
        return 'SECURE'
    }else if(score>=70){
        return 'VERY_STRONG'
    }else if(score>=60){
        return 'STRONG'
    }else if(score>=50){
        return 'AVERAGE'
    }else if(score>=25){
        return 'WEAK'
    }
    return 'VERY_WEAK'
}

// 判断是否是其他字符
function isOtherChar(char){
    let num = parseInt(char.charCodeAt(0))
    if(num >= 0x21 && num <= 0x2F){
        return true
    }else if(num >= 0x3A && num <= 0x40){
        return true
    }else if(num >= 0x5B && num <= 0x60){
        return true
    }else if(num >= 0x7B && num <= 0x7E){
        return true
    }
    return false
}

let line
while(line=readline()){
    console.log(solution(line))
}

}
// 求最大连续bit数
HJ86(){
  let num = null;
  while(num = parseInt(readline())) {
      let bitNum = num.toString(2);
      let bitArr = bitNum.split('0').filter(ele => ele);
      let bigNum = Math.max(...bitArr);
      console.log(bigNum.toString().length)
  }
}
// 最长回文子串
HJ85(){
  /*
  从头到尾扫描字符串，每增加一个新的字符，判断以这个字符结尾，且长度为m+1或m+2的子串是否为回文，
  如果是，更新最大回文子串 ---> 中心扩散
  i- m >= 1: 防止发生数组越界
  长度为m+1或m+2的子串: s[i-m-1:i+1] || s[i-m:i+1]
  */
  let str;
  while(str = readline()){
      let res = 0;
      // 枚举中心点，可能存在奇数、偶数位回文
      for(let i = 0; i < str.length; i++) {
          let s1 = palindrome(str, i, i);
          let s2 = palindrome(str, i, i+1);
          res = Math.max(res, s1, s2)
      }
      console.log(res);
  }
  function palindrome(s,l,r) {
      while(l>=0 && r<s.length && s[l] == s[r]){
          l--;
          r++;
      }
      return s.substr(l+1,r-l-1).length;
  }
}
// 二维数组操作
HJ83(){
  class Table {
    constructor (x, y) {
        this.x = x
        this.y = y
    }
    
    success () {
        console.log(0)
    }
    fail () {
        console.log(-1)
    }
    
    isInXArea(x) {
        return x > this.x - 1 ? false : true
    }
    isInYArea(y) {
        return y > this.y - 1 ? false : true
    }
    
    init () {
        if (/[1-9]/.test(this.x) && /[1-9]/.test(this.y)) return this.success()
        this.fail()
    }
    exchange (arr) {
        if (this.isInXArea(arr[0]) && this.isInXArea(arr[2]) && this.isInYArea(arr[1]) && this.isInYArea(arr[3])) return this.success()
        this.fail()
    }
    addRow (x) {
        if (!this.isInXArea(x) || this.x === 9) return this.fail()
        this.success()
    }
    addCol (y) {
        if (!this.isInYArea(y) || this.y === 9) return this.fail()
        this.success()
    }
    search (arr) {
        if (this.isInXArea(arr[0]) && this.isInYArea(arr[1])) return this.success()
        this.fail()
    }
  }
  
  let line;
  while (line = readline()) {
      // 1.
      const first = line.split(' ')
      const t = new Table(parseInt(first[0]), parseInt(first[1]))
      t.init()
      
      // 2.
      t.exchange(readline().split(' '))
      
      // 3.
      t.addRow(parseInt(readline()))
      
      // 4.
      t.addCol(parseInt(readline()))
      
      // 5.
      t.search(readline().split(' '))
  }

}
// 将真分数分解为埃及分数
HJ82(){
  let line;

    const getCommonConvention=(x,y)=>{
    //     求最小公约数 欧里几德算法，辗转相除法
        if(y == 0){
            return x
        }
        let z = x % y;
        return getCommonConvention(y,z)
    }
    const getCommonMultiple=(x,y)=>{
    //     求最小公倍数
        return (x*y) / getCommonConvention(x,y)
    }
    const getCalc=(x,y)=>{
    //     存放结果集合
        let result = [];
        let increase = 0;
        while(increase!=1){
    // 分母处以分子判断分子是分母的几分之几。比如8/11。 11/8 大于1 小于2 所以最多占1/2 
            let a = Math.floor(y / x);
    //      获取 2和11的最小倍数22 转变成相同分母
            let commonMultiple = getCommonMultiple(y, a + 1);
    //          将1/2放入第一个集合
            result.push('1/'+String(a+1))
            
    //     同等放大然后计算剩下的分子
            increase = (commonMultiple / y * x) -  (commonMultiple / (a + 1))
    //       比如 8 / 11 a=1 a+1 = 2. 第一个是1/2 所以最小公倍数是22， （22/11 * 8） - (22/1+1) 就是余数 5。
    //         简单来说就是。8/11 - 1/2 转变成 16/22 - 11/22 剩余5 即是5/22
    //         将问题转变成1/2 + 5/22的埃及分数 我们只需要求5/22的埃及分数
    //     判断剩余的值 和 最小公倍数是不是可以整除 如果整除则代表分子是分母的 1/xx. 
    //         如果不能整除则继续寻找 5/22的埃及分数
            if(y % x == 0){
                y = commonMultiple / increase
                x = 1
            }else{
                  x = increase
                  y = commonMultiple
            }
            
            if(increase==1){
                result.push('1/'+String(commonMultiple))
            }
        };
        return result
    }
    while(line = readline()){
        let str = line;
        let numArr =  str.split('/')
        let x = parseInt(numArr[0])
        let y = parseInt(numArr[1])
        let result = getCalc(x,y)
        console.log(result.join('+'));
        
    }

}
// 字符串字符匹配
HJ81(){
  let a=readline().split('');
  let b=readline().split('');
  const res = a.every(value => {
    return b.includes(value)
  })
  console.log(res)
}
// 整型数组合并
HJ80(){
  let str;
    while(str = readline()) {
        let arr1 = readline().split(' ').map(Number);
        let str2 = readline();
        let arr2 = readline().split(' ').map(Number);
        let res = [...new Set([...arr1,...arr2])];
        res.sort((a,b)=>a-b);
        console.log(res.join(''));
    }
}
// 火车进站
HJ77(){
  const number = parseInt(readline())
  const trains = readline().split(' ')
  const paths = []
  function sortAll(vals=[],max=0,inStack=[],outStack=[]){
      //已经全部出站
      if(outStack.length===max){
          paths.push(outStack.join(" "))
          return
      }
  //     一个都没进站，只能进站
      if(vals.length===max){
          inStack.push(vals.shift())
          sortAll(vals,max,inStack,outStack)
          return
      }
  //     还有可以进站的，选择进站
      if(vals.length>0){
          const cur = vals.shift()
          inStack.push(cur)
          sortAll(vals,max,inStack,outStack)
          inStack.pop()
          vals.unshift(cur)
      }
  //     有可以出战的，选择出战
      if(inStack.length>0){
          const cur = inStack.pop()
          outStack.push(cur)
          sortAll(vals,max,inStack,outStack)
          outStack.pop()
          inStack.push(cur)
      }
      
  }

  sortAll(trains,number)

  paths.sort((l,r)=>{
  //     if(l.length<r.length){
  //         return -1
  //     }else if(l.length>r.length){
  //         return 1
  //     }
      let p = 0
      while(p<l.length){
          if(l[p]<r[p]){
              return -1
          }else if(l[p]>r[p]){
              return 1
          }
          p++
      }
  })
  paths.forEach(item=>console.log(item))

}
// 尼科彻斯定理
HJ76(){
  while(line = +readline()) {
    let start = line * (line - 1) + 1 
    let res = []
    for(let i = 0; i < line; i++) {
        res.push(start + i * 2)
    }
    console.log(res.join('+'))
  }

}
// 公共子串计算
HJ75(){
  const line = readline();
  const line2 = readline();

  let short, long;
  if (line.length >= line2.length) {
      short = line2;
      long = line;
  } else {
      short = line;
      long = line2;
  }

  let dp = [];
  let max = 0;

  for (let i = 0; i < short.length; i++){
      dp[i] = 0;
      for (let j = 0; j <= i; j++) {
          let str = short.slice(j,i+1);
          if (long.indexOf(str) > -1) {
              dp[i] = Math.max(str.length, dp[i]);
              max = Math.max(max, dp[i])
          }
      }
  }

  console.log(max);

}
// 参数解析
HJ74(){
  while(line = readline()) {
    dealStr(line);
  }
  
  function dealStr(s) {
      var str = "";
      var arr = [];
      var flag = false; // 开关，处理""之中的字符串
      for(var i = 0; i < s.length; i++) {
          if(flag) {
              if(s[i] !== '\"'){
                  // 找到后引号之前将字符串存入str中
                  str += s[i];
              } else {
                  flag = false;
              }
          } else {
              if(s[i] == ' ') {
                  // 遇到空格将前面的参数字符串存如数组中,
                  // 然后将str置为空,待存入下一个参数
                  arr.push(str);
                  str = "";
              } else if(s[i] == '\"'){
                  // 遇到引号，查找引号中的内容
                  flag = true;
              } else {
                  // 没遇到空格或者引号将字符串存起来
                  str += s[i];
              }
          }
      }
      // 最后一个参数不会遇到‘ ’了，在单独存在数组中;
      arr.push(str);
      console.log(arr.length);
      arr.forEach((item) => {
          console.log(item);
      })
  }


}
// 计算日期到天数转换
HJ73(){
  var arr = readline().split(' ')
  var year = arr[0]
  var month = arr[1]
  var day = arr[2]
  var sum = 0
  for(var i = month-1; i > 0; i--) {
    sum += new Date(year, i, 0).getDate()
  }
  console.log(sum+Number(day))
}
// 百钱买百鸡问题
HJ72(){
  let temp = readline()

  if (typeof parseInt(temp) === 'number') {
      count()
  }

  function count() {
      // 公式推到：
      // 公鸡个数 cock，母鸡个数 hen，雏鸡个数 chicks = 100 - cock - hen
      // 5*cock + 3 * hen + (100 - cock - hen)/3 = 100 元
      // 推出：hen = 25 - 7 * cock / 4
      // 因为 hen >= 0 , 25 - 7 * cock / 4 >= 0 推出
      // 0 <= cock <= 15
      // 因为 hen 是正整数，所以，cock 是4的倍数，所以cock 的取值为：0 4 8 12
      // 总结：
      // 1. 公鸡的个数可能: [0, 4, 8, 12]
      let cockArr = [0, 4, 8, 12]
      cockArr.map(cock => {
          // 2. 母鸡、雏鸡与公鸡个数的关系
          let hen = 25 - 7*cock/4
          let chicks = 100 - cock - hen
          console.log(cock , hen , chicks)
      })
  }

}
// 字符串通配符
HJ71(){
  while(line1 = readline()) {
    var line2 = readline()
    var regStr = line1.toLowerCase().replace(/\*+/g, '*').replace(/\*/g,'[a-z0-9\.]*').replace(/\?/g,'[a-z0-9\.]')
    var reg = new RegExp('^' + regStr + '$','ig')
    print(reg.test(line2))
  }
}
// 矩阵乘法计算量估算
HJ70(){
  let n
  while(n = parseInt(readline())) {
      // 1. 创建二维数组 arr 保存输入矩阵
      const arr = []
      for(let i = 0; i < n; i ++) {
          arr[i] = readline().trim().split(' ').map(Number)
      }
      // 2. 获取计算法则 method 字符串
      const method = readline()
      let result = [], count = 0 // result 模拟栈结构，保存待计算的数据
      // 3. 遍历计算法则字符串
      for(let i = 0; i < method.length; i++) {
          if(method[i] === '(') { // 3.1 遇到前括号不做处理
              
          } else if(method[i] === ')') { // 3.3 当遇到后括号的时候，出栈计算并将结果重新入栈
              if(result.length >= 2) {
                  const second = result.pop()
                  const first = result.pop()
                  count += first[0] * first[1] * second[1]
                  result.push([first[0], second[1]])
              }
          } else { // 遇到非括号，进行入栈操作
              // 通过字母的 ascii 值判断对应矩阵的顺序
              result.push(arr[method.charCodeAt(i) - 65])
          }
      }
      console.log(count)
  }

}
// 矩阵乘法
HJ69(){
  while(line = readline()) {
    let x = parseInt(line);
    let y = parseInt(readline());
    let z = parseInt(readline());

    let A = [];
    let B = [];
    let C = Array(x).fill(0).map(x => Array(z).fill(0));

    for (let i=0; i< x;i++) {
        A.push(readline()); 
    }
    for (let i=0; i< y;i++) {
        B.push(readline()); 
    }
    A = A.map(
        x => x.split(' ').map(
            x => parseInt(x)
        ));
    B = B.map(
        x => x.split(' ').map(
            x => parseInt(x)
        ));;


    for(let i=0; i<x; i++) {
        for (let j=0; j<z; j++) {
            for(let k=0; k< y; k++) {
              C[i][j] += A[i][k] * B[k][j];
            }
        }
    }

    for(let item of C) {
        print(item.join(' '));
    }
}




}
// 成绩排序
HJ68(){
  let n;
  while (n = parseInt(readline())) {
      let flag = parseInt(readline());
      let score = [];
      for (let i = 0; i < n; i++) {
          let item = readline().trim().split(' ');
          score.push({
              name: item[0],
              point: Number(item[1]),
              index: i
          });
      }
      // 排序
      score.sort((a, b) => {
          if (a.point === b.point) {
              return a.index - b.index;
          } else if (flag === 0) {
            return b.point - a.point;
          } else if (flag === 1) {
            return a.point - b.point;
          }
      });
      for (let i = 0; i < n; i++) {
          const item = JSON.parse(JSON.stringify(score[i]));
          print(item.name + ' ' + item.point);
      }
  }

}
// 24点游戏算法
HJ67(){
  // 解题的关键在于理解题中"数据选取顺序无要求"
  // 对顺序无要求：即所有数据顺序存在!4(4的阶乘)种可能性。以输入"7 2 1 10"为例, map[1] -> [0,1,3,2] 对应数据 "7 2 10 1", map[2] -> [0,2,1,3] 对应数据 "7 1 2 10" let line;
  const map = [
    [0,1,2,3],[0,1,3,2],[0,2,1,3],[0,2,3,1],[0,3,1,2],[0,3,2,1],
    [1,0,2,3],[1,0,3,2],[1,2,0,3],[1,2,3,0],[1,3,0,2],[1,3,2,0],
    [2,0,1,3],[2,0,3,1],[2,1,0,3],[2,1,3,0],[2,3,0,1],[2,3,1,0],
    [3,0,1,2],[3,0,2,1],[3,1,0,2],[3,1,2,0],[3,2,0,1],[3,2,1,0]
  ];
  // const map = [];
  // function make(list, cur, path) {
  //     if (cur.length === 4) {
  //         path.push(Array.from(cur));
  //         return;
  //     }
  //     for (let i of list) {
  //         cur.push(i);
  //         let other = list.filter(i => !cur.includes(i));
  //         make(other, cur, path);
  //         cur.pop();
  //     }
  //     return;
  // }
  // make([0,1,2,3], [], map);
  function calc(ops, nums, order) {
    let ans = nums[order[0]];
    for (let i = 0, l = ops.length; i < l; i++) {
        let cur = nums[order[i + 1]];
        if (ops[i] === '0') {
            ans = ans + cur;
        } else if (ops[i] === '1') {
            ans = ans - cur;
        } else if (ops[i] === '2') {
            ans = ans * cur;
        } else {
            ans = ans / cur;
        }
    }
    return ans;
  }
  while (line = readline()) {
    const nums = line.split(' ').map(i => parseInt(i));
    let bool = false;
    for (let order of map) {
        for (let i = 0; i < 64; i++) {
            let ops = i.toString(4).padStart(3, '0');
            bool = calc(ops, nums, order) === 24;
            if (bool) break;
        }
        if (bool) break;
    }
    console.log(bool);
  }
}
// 配置文件恢复
HJ66(){
  let a 
  while(a=readline()){
      let b = a.split(' ')
      if(b.length==1) {
          'reset'.startsWith(b[0])?console.log('reset what'):console.log('unknown command')
      } else {
          let c = []
          let d = [
              ['reset','board','board fault'],
              ['board','add','where to add'],
              ['board','delete','no board at all'],
              ['reboot','backplane','impossible'],
              ['backplane','abort','install first']
          ]
          d.forEach(item => {
              if(item[0].startsWith(b[0]) && item[1].startsWith(b[1])) {
                  c.push(item)
              }
          })
          if (c.length==1) {
              console.log(c[0][2] )
          } else {
              console.log('unknown command')
          }
      }
  }
}
// 查找两个字符串a,b中的最长公共子串
HJ65(){
  const line1=readline();
  const line2=readline();

  let short = line1.length >= line2.length ? line2 : line1
  let long = line1.length >= line2.length ? line1 : line2

  let common = '';
  let i = 0; let j = 1;
  while (i < short.length && j < short.length+1) {
      let temp = short.slice(i, j);
        if (long.indexOf(temp) > -1) {
            common = temp.length > common.length ? temp : common;
            j++;
        } else {
            i++;
            j = i+1;
        }
    }

    console.log(common)

}
// MP3光标位置
HJ64(){
  let num = parseInt(readline());
  let str = readline().split('');
  // 声明存储当前列表和选中歌曲的变量
  let menu = [];
  let se = 1;
  // 根据输入的命令分别处理赋值
  if(num<=4){
      menu=[1,2,3,4].slice(0,num);
      str.forEach(i => {
          if(i === 'U'){
              se===1?se=num:se-=1;                
          }else if(i==="D"){
              se===num?se=1:se+=1;
          }
      })
  }else{
      str.forEach(i => {
          if(i === 'U'){
              if(se===1){
                  se=num;
                  menu=[num-3, num-2, num-1, num];
              }else{
                  se-=1;
                  se<=menu[0]?menu=[se, se+1, se+2, se+3]:menu=menu;
              }
          }else if(i==="D"){
              if(se===num){
                  se=1;
                  menu=[1,2,3,4];
              }else{
                  se+=1;
                  se>=menu[3]?menu=[se-3, se-2, se-1, se]:menu=menu;
              }            
          }       
      })
  }
  console.log(menu.join(' '))
  console.log(se)

}
// DNA序列
HJ63(){
  const fun = () => {
    let line
    while(line = readline()) {
        let str = line
        let num = parseInt(readline())
        let count = 0
        let countStr = ""
        for(let i=0;i<line.length;i++){
            let thatStr = str.substring(i,i+num)
            let thatNum = 0
            for(let j of thatStr) {
                if(j === "C" || j==="G") {
                   thatNum++ 
                }
            }
            if(thatNum > count) {
                countStr = thatStr
                count = thatNum
            }
        }
        console.log(countStr)
    }
}
fun()
}
// 查找输入整数二进制中1的个数
HJ62(){
  let str;
  while(str = readline()){
    let two = parseInt(str).toString(2);
    let arr = two.split('');
    let num = 0;
    arr.forEach((v)=>{
      if(v == '1'){
        num++;
      }
    })
    console.log(num)
  }
}
// 放苹果
HJ61(){
  let  str;
  while(str = readline()){
    let arr = str.split(' ');
    let m = parseInt(arr[0]),n=parseInt(arr[1]);
    console.log(getCount(m,n))
  }

  function getCount(m,n){
    if(m==0 || n==1){//极端情况1：都是最小值情况
      return 1;
    }else if(n>m){//极端情况2:盘子比苹果多，那肯定有n-m个盘子空着
      return getCount(m,m)
    }else{
      //极端情况3:范围：[至少一个盘子空着----所有盘子都不空，都有苹果]
      //假设有一个盘子为空，则(m,n)问题转化为将m个苹果放在n-1个盘子上，即求得(m,n-1)即可
      //假设所有盘子都装有苹果，则每个盘子上至少有一个苹果，即最多剩下m-n个苹果，问题转化为将m-n个苹果放到n个盘子上，即求(m-n，n)
      return getCount(m,n-1)+getCount(m-n,n);
    }
  }
}
// 查找组成一个偶数最接近的两个素数
HJ60(){
  while(n = parseInt(readline())){
    for(let i = n/2; i < n; i++){
        let j = n - i;
        if(isPrime(i) && isPrime(j)){
            console.log(j + '\n' + i);
            break;
        }
    }
  }
  
  function isPrime(n) {
      if(n >= 2){
          for(let i=2; i < Math.ceil(n / 2); i++){
              if(n % i == 0){
                  return false;
              }
          }
          return true;
      } else {
          return false;
      }
  }
}
// 找出字符串中第一个只出现一次的字符
HJ59(){
  function outputFirstLetter(str){
    const len = str.length
    for(let i = 0; i< len; i++){
        if(str.indexOf(str[i]) === str.lastIndexOf(str[i])){
            return str[i]
        }
    }
        return -1
    }
     
    console.log(outputFirstLetter(readline()))
}
// 输入n个整数，输出其中最小的k个
HJ58(){
  let input;

  // #1. 第一个 readline() 获取第一行输入
  while (input = readline()) { // 获取输入更方便 ‘5 2’
      // input.split(' ') // ['5', '2']
      let n = Number(input.split(' ')[0]) // 5
      let k = Number(input.split(' ')[1]) // 2
      
      // #2. 第二个 readline() 获取第二行输入 //  '1 3 5 7'
      // trim() 去除字符串的头尾空格
      // readline().trim().split(' ') // ['1', '3', '5', '7']
      let arr = readline().trim().split(' ').map(Number)
    
      // 排序 sor()
      arr.sort((a, b) => {
          return a - b
      });
    
      const res = arr.splice(0 , k).join(' ')
      print(res)
  }
}
//  高精度整数加法
HJ57(){
  const b = readline().split('');
  const a = readline().split('');
  let c = 0
  let res='';
  while( a.length || b.length || c) {
    c += ~~a.pop() + ~~b.pop()
    res = c%10 + res;
    c = c>9 ? 1 : 0;
  }
  console.log(res)
}
// 挑7
HJ55(){
  while(word = readline()) {
    word = parseInt(word, 10);
    let arr = [];
    for(var i=1;i<=word;i++) {
    ((i+'').includes('7') || !(i%7)) && arr.push(i);
    }
    console.log(arr.length);
  }
}
// 杨辉三角的变形
HJ53(){
  while(line = readline()){
    const n = Number(line);
    if(n==1 || n==2){
        console.log('-1');
    }else {
        if(n%4 == 1 || n%4 == 3){
            console.log('2');
        } else if(n%4 == 2){
            console.log('4');
        } else if(n%4 == 0) {
            console.log('3');
        }
    }
}
}
// 计算字符串的编辑距离
HJ52(){
  var minDistance = function(word1, word2) {
    let n = word1.length;
    let m = word2.length;
    if(n*m === 0) return n+m;
    if(word1 === word2) return 0;
    let dp = [];
    for(let i = 0;i <= n;i++){
        dp.push([])
        for(let j = 0;j <= m;j++){
            if(i*j){
                dp[i][j] = word1[i-1] == word2[j-1]? dp[i-1][j-1]: (Math.min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1]) + 1);
            }else{
                dp[i][j] = i + j;
            }
        }
    }
    return dp[n][m];
};



while(str1 = readline()) {
  const str2 = readline();
  console.log(minDistance(str1, str2));
}

}
//  输出单向链表中倒数第k个结点
HJ51(){
  var arr = [];
  while(line = readline()) {
      arr.push(line);
  }

  for(var i = 0; i < arr.length; i = i+3) {
      cacu(arr[i], arr[i+1], arr[i+2]);
  }

  function cacu(n, s, k){
      var link = s.split(' ').map(Number).reverse();
      var n = parseInt(k);
      if(link[n-1]){
          console.log(link[n-1]);
      }
  }
}
// 四则运算
HJ50(){
  const operatorMap = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
    "^": 2,
    "%": 2
  };
  
  // 中缀表达式转逆波兰表达式
  const convert = (inputArr = []) => {
    if (inputArr.length === 0) return [];
  
    const ops = [];
    const outputs = [];
  
    const n = inputArr.length;
    for (let i = 0; i < n; i++) {
      const elem = inputArr[i];
      if (/\d/.test(elem)) {
        outputs.push(elem);
        while (i + 1 < inputArr.length && /\d/.test(inputArr[i + 1])) {
          outputs[outputs.length - 1] += inputArr[i + 1];
          i++;
        }
      } else if (elem === "(" || elem === "[" || elem === "{") {
        // 入栈 操作符
        ops.push("(");
        if(inputArr[i+1] === '-' || inputArr[i+1] === '+') {
          outputs.push('0')
        }
      } else if (elem === ")" || elem === "]" || elem === "}") {
        while (ops.length) {
          const op = ops.pop();
          if (op === "(") break;
          outputs.push(op);
        }
      } else {
        // 如果是正常运算符
        while (ops.length >= 0) {
          const topOp = ops[ops.length - 1];
          // 如果运算符栈为空，或顶部运算符是 '(' ，亦或当前运算符优先级比栈顶优先级高
          if (
            ops.length === 0 ||
            topOp === "(" ||
            operatorMap[elem] > operatorMap[topOp]
          ) {
            ops.push(elem);
            break;
          } else {
            // 不然，就应该计算当前输出结果
            outputs.push(ops.pop());
          }
        }
      }
    }
    // 循环结束，如果运算符栈不为空，则添加到输出结果栈
    while (ops.length) {
      outputs.push(ops.pop());
    }
    return outputs;
  };
  
  const compute = (left, right, op) => {
    switch (op) {
      case "+":
        return left + right;
      case "-":
        return left - right;
      case "*":
        return left * right;
      case "/":
        return left / right;
      case "^":
        return left ** right;
      default:
        throw Error("bad oprator:" + op);
    }
  };
  
  const calc = (strArr = []) => {
    if (!Array.isArray(strArr) || strArr.length === 0) return 0;
    const tempArr = [];
  
    strArr.forEach((key) => {
      if (/\d/.test(key)) {
        tempArr.push(key);
      } else {
        // 运算符
        const left = ~~tempArr.pop();
        const right = ~~tempArr.pop();
        if (isNaN(left) || isNaN(right)) {
          throw Error(`无效表达式: ${strArr.join(",")}`);
        }
        tempArr.push(compute(right, left, key));
      }
    });
    return ~~tempArr[0];
  };
  const input = readline();
  const strArr = convert([...input])
  console.log(calc(strArr))
  
}
// 从单向链表中删除指定值的节点
HJ48(){
  let [total, start, ...arr] = readline().split(" ").map(Number);
  const rmVal = arr.pop();
  let res = [start];
  for (let i = 0; i < arr.length; i += 2) {
    const val = arr[i];
    const head = arr[i + 1];
    const index = res.findIndex((val) => val === head);
    res.splice(index+1, 0, val);
  }
  print(
    res
      .filter((n) => n !== rmVal)
      .join(" ")
  );
}
// 名字的漂亮度
HJ45(){
  while(n = readline()){
    for(let i = 0; i < n; i++){
        let str = readline()
        let map = new Array(26).fill(0);
        let res = 0;
        let arr = str.toLowerCase().split('');
        arr.forEach((ele)=>{
            map[ele.charCodeAt(0)-97]++;
        })
        map.sort((a,b)=>b-a);
        for(let i=0;i<26;i++){
            res += map[i] * (26 - i)
        }
        console.log(res);
    }
  }
}
// Sudoku
HJ44(){
  // 用数组存放数独，从左到右从上到下遍历数组
  // 因为涉及到同一个九宫格内有多个0的情况，需要用DFS回溯找到解
  //检测到值为0的元素，用1-9替代该元素，检测元素所行，所在列，所在九宫格中有无相等的数字

  //输入9*9数组
  let arr = Array(9).fill(0).map(e=>Array(9).fill(0).map(Number));
  let line;
  let tempArr = [];
  while (line = readline()){
      tempArr.push(line.split(" ").map(Number))
  }
  //tempArr.forEach(e=>console.log(e.join(" ")))
  for (let i = 0;i<9;i++){
      for (let j = 0; j<9;j++){
          arr[i][j]=tempArr[i][j]
      }
  }

  //arr.forEach(e=>console.log(e.join(" ")))

  // 检验函数
  function check(row,col,val){
      //所在行有相同数字，返回false
      for (let i = 0; i<9;i++){
          if(arr[row][i] == val) return false
      }
      //所在列有相同数字，返回false
      for (let j = 0; j<9;j++){
          if(arr[j][col] == val) return false
      }
      //所在九宫格有相同数字
      let rowMax = (~~(row/3))*3+3;
      let colMax = (~~(col/3))*3+3;
      for(let k = rowMax -3; k < rowMax; k++ ){
          for (let l = colMax -3; l < colMax; l++){
              if(arr[k][l] == val) return false
          }
      }
      return true;   
  }
  //console.log(check(0,0,1))
  //console.log(check(0,0,5))

  //遍历数组
  let finishFlag = false;
  let outputArr = [];
  // DFS算法遍历所有可能

  function dfs(y,x){
      //行末换到下一行
          if (x == 9){  
              y ++;
              x = 0;
      }
      //设置边界条件
      if(y == 9){
          finishFlag = true;
          //深拷贝
          outputArr = JSON.parse(JSON.stringify(arr));
          return;
      }
      
      if(arr[y][x] == 0){
          for(let n = 1; n<=9; n++){
              if(check(y,x,n)){
                  arr[y][x] = n;
                  dfs(y,x+1);
                  //回溯,
                  if (finishFlag) return //回溯剪枝
                  arr[y][x] = 0;
              }
          }
          return;
      }
      else{
          dfs(y,x+1);
      }  
  }

  dfs(0,0);


  outputArr.forEach(e=>console.log(e.join(" ")))
}
// 迷宫问题
HJ43(){
  //此为 DFS 深度搜索，搞了一下午，上网看了视频，还有广度搜素
  while(line = readline()) {
    let [n, m] = line.split(' ').map(x => parseInt(x));
    let test = Array(n).fill(0).map(x => Array(m).fill(0)); // 0表示没走过， 1表示已走
    let arr = []; // 0 表示空地，1表示阻挡
    let arrX = [1, 0, -1, 0]; //下一步x对应的右、下、左、上
    let arrY = [0, 1, 0, -1]; //下一步y对应的右、下、左、上
    let target = [];
    for(let i = 0; i < n; i++) {
        arr.push(readline().split(' ').map(x => parseInt(x)));
    }
    dfs(0, 0, [{x: 0, y:0}]);
    for (let item of target) {
        print(`(${item.y},${item.x})`);
    }
    function dfs(x ,y, points) {
        points = JSON.parse(JSON.stringify(points)); //必须得深拷贝否则会将所有走过的点都记录
        if (x == m-1 && y == n-1) {
            return target = points; //如果有多条路径，此处可以作判断将points最短的赋值给target
        }
        for(let key = 0; key <= 3; key ++) {
            let pointX = x + arrX[key];
            let pointY = y + arrY[key];
            if (pointX >= 0 && pointX < m && pointY >=0 && pointY < n) {
                if (arr[pointY][pointX] == 0 && test[pointY][pointX] == 0 ){
                  test[pointY][pointX] = 1;
                  points.push({x: pointX, y: pointY})
                  dfs(pointX, pointY, points);
                  points.pop(); // 回退
                  test[pointY][pointX] = 0; //还原状态
              }  
            }

        }
        return;
    }
  }
}
// 学英语
HJ42(){
  const ones=['zero','one','two','three','four','five','six','seven','eight','nine'];
  const tens=['ten','eleven','twelve','thirteen','forteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
  const twieties=['zero','ten','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
  const range=[1e2,1e3,1e6,1e9,1e12];
  const ranges=['hundred','thousand','million','billion'];

  const transfer=(num)=>{
    if(num <= 9) return ones[num];
    if(num <= 19) return tens[num % 10];
    if(num <= 99){
      let num1=Math.floor(num/10);
      let num2;
      if(num % 10 === 0){
        num2='';
      }else{
        num2=' '+ones[num % 10];
      }
      return twieties[num1]+num2;
    } 

    for(let i=0;i<4;i++){
      if(num < range[i+1]){
        let res='';
        res+=transfer(Math.floor(num / range[i]));
        res+=' ';
        res+=ranges[i];
        if(num % range[i] == 0){
          res+=' ';
        }else{
          if(i != 0){
            res+=' ';
          }else{
            res+=' and ';
          }
          res+=transfer(num % range[i]);
        }
        return res;
      }
    }
    return '';
  }
  const n=parseInt(readline('1100'));
  console.log(transfer(n));
}
// 称砝码
HJ41(){
  let n=readline('2');
  let weight=readline('1 2').split(' ').map(i=>Number(i));
  let num=readline('2 1').split(' ').map(i=>Number(i));
  const res={0:true};

  for(let i=0,len=weight.length;i<len;i++){
    const cur=Object.keys(res).map(i=>Number(i));
    for(let j=1;j<=num[i];j++){
      cur.forEach(item=>{
        const val=item+j*weight[i];
        if(!res[val]){
          res[val]=true;
        }
      });
    }
  }
  console.log(Object.keys(res).length);
}
// 判断两个IP是否属于同一子网
HJ39(){
  
  const isIp=(str)=>{
    const ipArr=str.split('.');
    let suc=true;
    ipArr.map(i=>{
      if(parseInt(i) > 255){
        suc=false;
      }
    });
    let reg=/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
    if(reg.test(str) && suc){
      return true;
    }else{
      return false;
    }
  }

  const toPad=(ipStr)=>{
    return ipStr.split('.').map((el)=>Number(el).toString(2).padStart(8,'0'));
  }

  const isIpMask=(arr)=>{
    return !arr.join('').includes('01');
  }

  const getAnd=(p1,p2)=>{
    let i=0;
    let pArr='';
    const tem=[];
    while(i < 4){
      const a1=p1[i].split('');
      const a2=p2[i].split('');
      let j=0;
      while(j < 8){
        if(a1[j] == 0 || a2[j] == 0){
          tem.push(0);
        }else{
          tem.push(1);
        }
        j++;
      }
      pArr+=tem.join('');
      i++;
    }
    return pArr;
  }

  const a=readline('255.255.255.0');
  const ip1=readline('192.168.224.256');
  const ip2=readline('192.168.10.4');

  if(isIp(a) && isIp(ip1) && isIp(ip2)){
    const yArr=toPad(a);
    if(isIpMask(yArr)){
      const p1Arr=toPad(ip1);
      const p2Arr=toPad(ip2);
      if(getAnd(p1Arr,yArr) === getAnd(p2Arr,yArr)){
        console.log(0);
      }else{
        console.log(2);
      }
    }else{
      console.log(1);
    }
  }else{
    console.log(1);
  }
}
// 求小球落地5次后所经历的路程和第5次反弹的高度
HJ38(){
  const h=parseInt(readline('1'));
  let sum=h;
  let h2=h/2;
  for(let i=0;i<4;i++){
    sum+=h2*2;
    h2/=2;
  }
  console.log(sum);
  console.log(h2);
}
// 字符串加密
HJ36(){
  const key=readline('byga');
  const msg=readline('aitkekbicknkibgsethodvubsrhcvs');
  const line=('ABCDEFGHIJKLMNOPQRSTUVWXYZ').toLocaleLowerCase();
  const set=new Set(key+line);
  const list=new Array(...set);
  let res='';
  for(let i=0;i<msg.length;i++){
    const idx=line.indexOf(msg[i]);
    const mi=list[idx];
    if(mi) res+=mi;
  }
  console.log(res);
}
//蛇形矩阵
HJ35(){
  let n=parseInt(readline('4'));
  let arr=[];
  let count=2;
  for(let i=1;i<n+1;i++){
    if(arr.length < 1){
      arr.push(1);
    }else{
      arr.push(arr[arr.length-1]+count);
      count++;
    }
  }
  for(let i=0;i<n;i++){
    let str='';
    arr.slice(i).map((e)=>{
      str+=e-i+' ';
    });
    console.log(str)
  }
  
}
// 图片整理
HJ34(){
  let line=readline('Ihave1nose2hands10fingers');
  const lines=line.split('');
  lines.sort();
  console.log(lines.join(''));
}
// 整数与IP地址间的转换
replaceIntWithIP(){
  const toNum=(ip)=>{
    const arr = ip.split(".").map(ele => Number(ele).toString(2)).map(ele => ele.padStart(8, "0"))
    const num=parseInt(arr.join(''),2);
    console.log(num);
  }
  const toIp=(num)=>{
    const n=parseInt(num,10);
    let str=n.toString(2);
    str=str.padStart(32,'0');

    let res=[];
    for(let i=0,len=str.length;i<len;i+=8){
      res.push(parseInt(str.slice(i,i+8),2).toString(10));
    }
    console.log(res.join('.'));
  }
  toNum(readline('10.0.3.193'));
  toIp(readline('167969729'));
}
// 密码截取
getMima(){
  const line=readline('ABBA');
  const len=line.length;
  let res='';

  if(len <= 1){
      console.log(1);
  }else{
      for(let i=0;i<len;i++){
        console.log('--------',i);
          let l=i-1;
          let r=i+1;
          console.log('1',l,r);
          while(l>=0 && r<len && line[l] === line[r]){
              r++;
              l--;
              console.log('111',l,r);
          }
          if(res.length < r-l-1){
              res=line.substring(l+1,r);
          }
          console.log(2,res);
          l=i;
          r=i+1;
          console.log(3,l,r);
          while(l>=0 && r<len && line[l] === line[r]){
              r++;
              l--;
              console.log('333',l,r);
          }
          if(res.length < r-l-1){
              res=line.substring(l+1,r);
          }
          console.log(4,res);
      }
      console.log(res.length);
  }

}
// 单词倒排
sortTailWords(){
  // /[^A-Za-z]+/ 大小写之外的所有字符
  let lines=readline().split(/[^A-Za-z]+/).reverse().join(' ');
  console.log(lines);
}

// 字符串处理
dealString(){
    while(line=readline()){
      const [a,b]=line.split(' ');
      let res='';
      let str=a+b;
      let oddArr=[];
      let evenArr=[];
      for(let i=0;i<str.length;i++){
          if(i%2 === 0){
              evenArr.push(str[i]);
          }else{
              oddArr.push(str[i]);
          }
      }
      oddArr.sort()
      evenArr.sort()
      
      for(let i=0;i<str.length;i++){
          if(i%2 === 0){
              res+=evenArr.shift();
          }else{
              res+=oddArr.shift();
          }
      }
      //3
      let finish='';
      for(let i=0;i<res.length;i++){
          let curLetter=res[i];
          if(( curLetter> 'F' && curLetter < 'a') || curLetter > 'f'){
              finish+=curLetter;
          }else{
              let num=[...parseInt(curLetter,16).toString(2).padStart(4,'0')].reverse().join('');
              finish+=parseInt(num,2).toString('16').toUpperCase();
          }
      }
      console.log(finish);
  }
}
// 字符串加密
encodeAndDecode(){
  const encodeArr=[];
  const decodeArr=[];
  const upCase='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const lowerCase='abcdefghijklmnopqrstuvwxyz'.split('');

  const encode=(str)=>{
      str.split('').forEach((i,idx)=>{
          if(/[A-Z]/.test(i)){
              if(i === 'Z'){
                encodeArr.push('a'); 
              }else{
                encodeArr.push(lowerCase[upCase.indexOf(i)+1]); 
              }
          }else if(/[a-z]/.test(i)){
              if(i === 'z'){
                encodeArr.push('A'); 
              }else{
                encodeArr.push(upCase[lowerCase.indexOf(i)+1]); 
              }
          }else if(/[0-9]/.test(i)){
              if(i === '9'){
                  encodeArr.push(0);
              }else{
                  encodeArr.push(++i);
              }
          }
      })
      console.log(encodeArr.join(''));
  }

  const decode=(str)=>{
      str.split('').forEach((i,idx)=>{
          if(/[A-Z]/.test(i)){
              if(i === 'A'){
                decodeArr.push('z'); 
              }else{
                decodeArr.push(lowerCase[upCase.indexOf(i)-1]); 
              }
          }else if(/[a-z]/.test(i)){
              if(i === 'a'){
                decodeArr.push('Z'); 
              }else{
                decodeArr.push(upCase[lowerCase.indexOf(i)-1]); 
              }
          }else if(/[0-9]/.test(i)){
              if(i === '0'){
                  decodeArr.push(9);
              }else{
                  decodeArr.push(--i);
              }
          }
      })
      console.log(decodeArr.join(''));
  }

  encode(readline());
  decode(readline());

}
// 素数伴侣
maxPrime(){
  function isPrime(num){
    if(!num) return false;
    let loopMax=Math.sqrt(num);
    if(Number(num) <= 1) return false;
    if(num <=3) return num>=2;
    for(let i=2;i<=loopMax;i++){
        if(num%i===0){
            return false;
        }
    }
    return true;
  }

  function find(used,evens,num,evensMatch){
    for(let i=0;i<evens.length;i++){
        if(isPrime(num+evens[i]) && used[i] === 0){
            used[i]=1;
            if(evensMatch[i] === 0 || find(used,evens,evensMatch[i],evensMatch)){
                evensMatch[i]=num;
                return true;
            }
        }
    }
  }

  function getRes(arr1,arr2){
    let count=0;
    let evensMatch=new Array(arr2.length).fill(0);
    
    for(let i=0;i<arr1.length;i++){
        let used=new Array(arr2.length).fill(0);
        if(find(used,arr2,arr1[i],evensMatch)){
          count++; 
        }
    }
    console.log(count);
  }

  let n=parseInt(readline());
  let numberArr=readline().split(' ').map(i=>parseInt(i));
  let arr1=numberArr.filter(i=>i%2 === 0);
  let arr2=numberArr.filter(i=>i%2 !== 0);
  getRes(arr1,arr2);
}
// find brother letters
findBroLetters(){
  const lines=readline().split(' ');

  const len=lines.length;
  const complieArr=lines.slice(1,len-2);
  const idx=lines[len-1]-1;
  const origin=lines[len-2];
  const letterArr=origin.split('');

  let resArr=[];
  for(let i=0;i<complieArr.length;i++){
      const curStr=complieArr[i];
      let matchNum=0;
      if(curStr.split('').sort().join('') === letterArr.sort().join('') && curStr !== origin){
          resArr.push(curStr);
      }
  }
  resArr=resArr.sort()
  console.log(resArr.length);
  if(resArr[idx]){
      console.log(resArr[idx]);
  }

}
// sort string
sortString(){
  const str='A Famous Saying: Much Ado About Nothing (2012/8).';
  let line=readline(str)
  let lines=line.split('');
  let sortArr=[];
  
  // 将字符串中的英文摘出来并且按照字母表进行排序
  for(let i=0;i<26;i++){
    for(let j=0;j<lines.length;j++){
      if(lines[j].charCodeAt(0) === 65+i || lines[j].charCodeAt(0) === 97+i){
        console.log('|||',lines[j],lines[j].charCodeAt(0));
        sortArr.push(lines[j]);
      }
    }
  }

  // 将非英文字符按照原位置idx塞入到新数组
  for(let i=0;i<lines.length;i++){
    if(!/[a-zA-Z]/g.test(lines[i])){
      sortArr.splice(i,0,lines[i]);
    }
  }

  console.log(sortArr.join(''));
}
  
 }

