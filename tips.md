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

## Node特点

+ 单线程 无状态同步的烦恼
+ 异步 IO
+ 事件驱动＋回调
+ 跨平台

适合 IO 密集型， 不怵 CPU 密集型