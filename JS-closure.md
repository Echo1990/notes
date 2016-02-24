---

layout: post
title: JS 闭包
author: 李斌

--- 

#JavaScript closure（闭包）

##   **闭包的概念**
[Wikipedia](https://en.wikipedia.org/wiki/Closure_(computer_programming))：*In programming languages, closures (also lexical closures or function closures) are a technique for implementing lexically scoped name binding in languages with first-class functions*. 

译文："在编程语言中，闭包（也词法闭包或函数闭包）是结合在拥有 [First-class function](https://en.wikipedia.org/wiki/First-class_function) 的语言中，实现词法作用域名的一种技术。"

[扩展: 什么是 firs-class ?](https://www.zhihu.com/question/27460623/answer/36747015)

+ First-class 指的是可以作为参数传递，可以使用`return`里返回，可以赋给变量的类型
+ Second-class 该等级类型的值可以作为参数传递，但是不能从子程序里返回，也不能赋给变量 
+ Third-class 该等级类型的值连作为参数传递也不行

**百度百科：** *[闭包](http://baike.baidu.com/link?url=wheoR5tCOFANd56LTm1x3_9k5OdwdaO5JnBzDs4kIC7KMbLT74G6cLD0whz8KgzSBO2B10iSTfeT0B-M-eLxm_) 指可以包含自由（未绑定到特定对象）变量的代码块；这些变量不是在这个代码块内或者任何全局上下文中定义的，而是在定义代码块的环境中定义（局部变量）。*

从概念上来看，维基百科的解释更加偏向于理论层面的抽象概念，而百度的定义则偏重实际编码中的实体。

那么闭包（closure）究竟是什么？

## JavaScript中的闭包

以 JavaScript 语言为例，谈一谈闭包。

首先，在 JavaScript 中几乎所有类型都可为 first-class 类型 (包括function)， 所以，JavaScript 中闭包是确定存在的。

### 不一样的作用域

由于闭包 (closure)本身与作用域(scope)息息相关，所以有必要先谈谈 JS 的作用域。

与其他语言不同的是: JavaScript 默认并无块级作用域，也就是说在花括号`{}`不能形成一个独立的作用域（例如 Java、C++ 中的作用域），而是函数级作用域, 也就是每次创建一个 function 才会形成一个新的 “块级“ 作用域。

例如：

```js
var name="global";  
if(true){  
    var name="local";  
    console.log(name)  //local
}  
console.log(name); //local
```
假设 JavaScript 有块级作用域，明显`if`语句将创建一个局部的变量name, 并不会修改全局 `name`, 上段代码应该输出 “local” 和 “global”。可是实际上没有这样, 都输出是 “local" 。

所以 JS 没有块级作用域。

所谓函数作用域就是说：变量在声明它们的函数体以及这个函数体嵌套的任意函数体内都是有定义的。

比如：

```js
var scope="global";  
function t(){  
    console.log(scope);  //undefined
    var scope="local" ; 
    console.log(scope);  //scope
}  
t();  
```
全局定义变量`scope`， 函数内部又定义一次`scope`, 那么在函数内部的作用域中，旧的定义会被覆盖。 而在第一句 `console.log` 时

```js
var g = 0; //全局作用域
function f() {
    // 这里面就形成了一个函数作用域, 能够保护其中的变量不能被外部访问
    var a = 1;
    console.log(g); // 函数作用域内能够访问全局作用域的变量
    
    // 嵌套函数作用域
    function ff() {
        // 这里面再度形成了一个函数作用域，其中可以访问外部的f函数作用域
        var aa = 2;
        console.log(a);
    }
    console.log(aa); // 出了 ff 的作用域就不能访问其中的东西了，报错 defined
}
f();
console.log(a); // 报错 ReferenceError: a is not defined
```
由于在Javascript语言中，只有函数内部的子函数才能读取局部变量，因此可以把闭包简单理解成“定义在一个函数内部的函数”。所以，在本质上，闭包就是将函数内部和函数外部连接起来的一座桥梁。

闭包是一个拥有许多变量和绑定了这些变量的环境的表达式（通常是一个函数），所以大多数情况下可以说闭包就是能够读取其他函数内部变量的函数。

当函数fn1的内部函数fn2被函数fn1外的一个变量引用的时候，就创建了一个闭包。

###  经典示例：

弄清楚作用域的问题后, 我们就可以开始聊聊闭包了.
我们以最经典的for循环为例来讲解. 大家可以试试下面这段代码, 取自JavaScript 秘密花园循环中的闭包

```
for(var i = 0; i < 10; i++) {
    setTimeout(function() {
        console.log(i);
    }, 1000);
}
```
如果在运行前, 你没有猜到正确答案, 那就对了...


1. 首先说说为什么最终输出的是10次10, 而不是你想象中的 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
   因为setTimeout是异步的!
   你可以想象由于setTimeout是异步的, 因此我们将这个for循环拆成2个部分
   第一个部分专门处理 i 值的变化, 第二个部分专门来做setTimeout
   因此我们可以得到如下代码
   
```
   // 第一个部分
   i++;
   ... 
   i++; // 总共做10次

   // 第二个部分
   setTimeout(function() {
      console.log(i);
   }, 1000);
   ...
   setTimeout(function() {
      console.log(i);
   }, 1000); // 总共做10次

```
   这样一拆后, 我相信你肯定知道之前那个for循环的运行结果了.
   由于循环中的变量 i 一直在变, 最终会变成10, 而循环每每执行setTimeout时, 其中的方法还没有真正运行, 等真正到时间执行时, i 的值已经变成 10 了!
   i 变化的整个过程是瞬间完成的, 总之比你异步要快, 就算你setTimout是0毫秒也一样, 会先于你执行完成.
```
   for(var i = 0; i < 10; i++) {
       setTimeout(function() {
           console.log(i);
       }, 0);
   }
```
2. 那么为什么setTimeout中匿名function没有形成闭包呢?
   因为setTimeout中的匿名function没有将 i 作为参数传入来固定这个变量的值, 让其保留下来, 而是直接引用了外部作用域中的 i, 因此 i 变化时, 也影响到了匿名function.

   因此如果我们定义一个外部函数, 让 i 作为参数传入即可"闭包"我们要的变量了!!
   
```
   for (var i = 0; i < 10; i++) {
       // 注意关键是我们把想要闭包的值当参数传入一个方法
       // 这个方法 return 一个新的方法 -- 闭包!!
       setTimeout(fn(i), 1000);
   }
   function fn() { // 为了深刻理解闭包, 这个函数我没有用参数
       // 神奇的"闭包"发生在这一步, 其实就是作用域和值复制在起了关键作用,
       // 对于数字/字符等类型是复制值, 而不是引用
       var a = arguments[0];
       return function() {
           console.log(a); // 注意现在我操作的变量已经变成 a 了,
                                     // 已经和 i 没有半毛线关系了!
                                     // 而 a 的值就是当时执行时赋予的一个确定值,
                                     // 不会因 i 的变化而变化了!
       };
   }
```

3. 再换成更简洁的方式看你能不能真正理解闭包

```   
   for (var i = 0; i < 10; i++) {
       (function(a) {
           // 变量 i 的值在传递到这个作用域时被复制给了 a,
           // 因此这个值就不会随外部变量而变化了
           setTimeout(function() {
               console.log(a);
           }, 1000);
       })(i); // 我们在这里传入参数来"闭包"变量
   }
```
这就是我所理解的闭包, 简单点说就是专门用来"包养"变量的.

一个经典的例子：

 
```js
function fun(n,o) {
  console.log(o)
  return {
    fun:function(m){
      return fun(m,n);
    }
  };
}
var a = fun(0);  a.fun(1);  a.fun(2);  a.fun(3);//undefined,?,?,?
var b = fun(0).fun(1).fun(2).fun(3);//undefined,?,?,?
var c = fun(0).fun(1);  c.fun(2);  c.fun(3);//undefined,?,?,?
        
```


## 使用闭包的注意点:

+ 由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致内存泄露。解决方法是，在退出函数之前，将不使用的局部变量全部删除。

+ 闭包会在父函数外部，改变父函数内部变量的值。所以，如果你把父函数当作对象（object）使用，把闭包当作它的公用方法（Public Method），把内部变量当作它的私有属性（private value），这时一定要小心，不要随便改变父函数内部变量的值。


