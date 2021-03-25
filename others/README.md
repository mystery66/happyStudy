<!--
 * @Author: your name
 * @Date: 2021-03-24 13:42:57
 * @LastEditTime: 2021-03-25 19:11:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /study/happyStudy/others/README.md
-->
# js基础
## 数据类型
 + 基本类型：number string undefined Boolean null symbol(独一无二的值， 可以用它设置私有属性)
 + 引用类型： object array function date
 ### 两者区别
  基本类型在计算机中存储在栈内存，而引用类型存储在堆内存中。在变量赋值时，基本类型复制的是值，而引用类型是复制其指针。这也导致了变量修改某一个属性的时候，另一个变量属性也被修改(指针指向同一个对象)。
## 类型判断
  ### typeof
  + 不能区分null和Object
  ```
  typeof null === 'object' // true
  ```
  + 不能区分Array 和 Object 
  ```
  typeof [] === 'object' // true
  typeof {} === 'object' // true
  ```
  + 原因：js利用低位存贮变量信息，000 代表着对象，而null全部是0，typeof 就是根据前三位判断导致误判。而Array是Object的一种, 所以会导致不能区分Array和Object。
  ### instaceOf
  + 通过原型比较来判断数据类型.数组的原型是Object所以会出现以下情况：
  ```
  [] instenceof Array // true
  [] insteceof Object // true
  ```

  ## Obejct.prototype.toString.call()
+ 通过借用包装对象类型判断
```
Obejct.prototype.toString.call(1) // [object Number]
Obejct.prototype.toString.call([]) // [object Array]
Obejct.prototype.toString.call({}) // [object Object]
```
## 类型转换
+ 转换为布尔值
+ 转换为数字
+ 转换为字符串

### 转化为Boolean
在进行条件判断时 undefined, null, 0, NaN, '' 会转化为false 其他的转化为true

### 对象转原始类型流程

+ 有symbol.toPrimtive优先调用在返回
+ 如果需要转化为字符串类型的话，调用toString()转换为原始类型在返回
+ 如果转化为不为字符串类型，调用valueof()转化为基础类型，若调用后不是基础类型，在调用toString()
+ 如果没有转化为基础类型就会报错

### this 指向
  this的指向取决于函数被调用时上下文环境决定的
+ 当作为普通函数，this指向window
+ 当作为对象的属性方法被调用时，this指向该对象
+ new的时候this指向该实例
## 执行上下文
执行上下文可以理解为当前代码的执行环境，它会形成一个作用域。js中运行环境分为3种：
+ 全局环境
+ 函数环境
+ eval环境