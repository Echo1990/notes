## 主流浏览器及其内核
+ **Internet Explorer** : Trident
+ **Fire Fox** ：Gecko
+ **Opera** ：Presto
+ **Safari** ：Webkit
+ **Chrome** ：Webkit

*注: 参与Webkit引擎开发的人很多也参与了Gecko（FF内核）开发。 所以WebKit也使用了一部分Gecko（FF内核）的代码。* 


## HTML版本发展
+ **HTML** : 1991
+ **HTML+** : 1993
+ **HTML2.0** : 1995
+ **HTML3.0** : 1997
+ **HTML4.01** : 1999
+ **XHTML** : 2000

        1.标签必须正确嵌套
        2.标签必须闭合
        3.标签、属性均小写
        4.必须有根元素<html>
        
+ **HTML5** : 2012
+ **XHTML5** : 2013


##ID和class的区别

1. 只能在文档中使用一次，而类可以使用多次。

2. `ID`不能结合使用，`class`可以。
   如:`.class1. class2{属性：值}`
   	`<div class="class1 class2">元素内容</div>`

3. JavaScript 经常和`ID`配合使用

4. 数据加载方向不同，`ID`先找到结构、内容、渲染。`class`先渲染、再结构、内容。


## in-line 和 block

1. `in-line`元素只能包含`in-line`元素，不能包含`block`元素。

2. 一部分`block`元素可以包含`in-line`元素和`block`元素。

3. 另一部分`block`元素可以包含`inline`元素但不可以包含`block`元素。

   如：
`<h1>、<h2>、<h3>、<h4>、<h5>、<h6>、<caption>` ,
段落标记的`<p>`；
分隔线`<hr>`；
一个特别的元素`<dt>`，它只存在于列表元素`<dl>`的子一级。

	另：
其实在`in-line`元素中，有几个元素（`<img>、<input>`等）比较特别，它们可以定义宽高。

## JS三级事件处理

1. HTML事件处理

	<!--lang:JavaScript-->
	```
	<button onclick=“demo()”>按钮</button>
	<script>
	function demo()
	{
   		alert（“HTML事件处理”）；
	}
	</script>
   ```
	缺点：HTML中夹杂着事件绑定代码，更改较为麻烦。

2. DOM 0级事件处理

	```
	<button id=“btn”>按钮</button>
	
	<script>
	var btn=document.getElementById("btn");
	btn.onclick=demo();
	
	function demo()
	{
	    alert（“HTML事件处理”）；
	}
	</script>
	```
	缺点：绑定多个函数时，后面的函数会覆盖前者。

3. DOM 2级事件处理

   ```
	<button id=“btn”>按钮</button>
	
	<script>
	var btn=document.getElementById("btn");
	btn.addEventListener("click",demo);
	
	function demo()
	{
	    alert（“HTML事件处理”）；
	}
	</script>
	```
	这样事件绑定的函数就不会覆盖，而会顺序执行。
	
## `window`对象`scroll`事件处理之 ***throttle*** 和 ***debounce***  
[具体概念请点这里](http://www.cnblogs.com/fsjohnhuang/p/4147810.html)

+ **现状描述**：很多移动端的网页都有 ***下拉刷新*** 的逻辑。其中可以采用 ***throttle*** 方法对于连续的`scroll`事件所触发业务逻辑（包含数据加载）的次数进行了稀释，从原生的像素级别的滑动触发，稀释到了间隔规定时间间隔触发一次，从而极大的降低了`scroll`事件对业务逻辑的高频触发，提高了滑动流畅度以及页面性能。
+ **问题发现**：然而，开发过程中经常遇到的问题是，当屏幕被快速滑动到底部时候，下一个Page的资源会经常加载不出来。特别是在 Chrome 模拟器中，通过鼠标拖动可以达到极快的滑动速度时，资源加载不出的情况更是发生频率很高。经排查，原因也很简单，就是由于代码中采用 ***throttle*** 方法做了节流。当使用者滑动超快，一次滑动事件的时间低于设定的阈值，滑动事件就无法触发具体的业务逻辑，无法加载新数据。

+ **修改方式**：目前的修改办法是简单的将阈值改小，如降至 100 毫秒，将数据加载不出的可能性降低。但是并不能根本的解决这个问题。因为极端情况下，100 毫秒以内的`scroll`事件也可以产生。同时，页面性能也会因为阈值小、`scroll`事件触发业务逻辑频率升高造成页面性能下降。

个人倾向于采用 ***debounce*** 的方式，***为每一个`scroll`事件触发的业务逻辑设定一个执行的 timeout，并将所有与前一个`scroll`事件间隔小于该阈值（即 timeout）的`scroll`事件触发的业务逻辑都进行丢弃***，直到上一个事件完成后经过的时间已经超过该阈值。

如此则有：

1. 无论用户/测试人员以多快速度滑动页面，一旦到页面底部，滑动事件均会由于页面无新内容而被迫停止。此时，采用了***debounce*** 方式，`scroll`事件触发的业务逻辑确保能被执行； 
2. 丢弃与前一个`scroll`事件间隔小于特定阈值的后一个事件的业务逻辑，即就是对`scroll`事件触发业务逻辑次数进行了稀释，也同样提高了页面效率。