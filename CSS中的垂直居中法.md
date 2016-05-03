# CSS 垂直居中方法


我们都清楚元素相对其父级元素水平居中展示的方法：对于`inline` 的元素，我们都会想到为其父级元素设置`tex-align : center`。对于`block` 元素，我们会设定其 `margin: 0px auto`。 
然而，垂直居中的实现方法，并没有这么简单，以下列出 6 种垂直居中法。

参考文章：[6 Methods For Vertical Centering With CSS](http://vanseodesign.com/css/vertical-centering/)

## `Vertical-Align`
既然有水平居中属性`text-align: center`, 我们的第一反应、实现水平居中的方法应该是`vertical-align: middle`。

*该属性定义行内元素的<strong>基线相对于该元素所在行的基线的垂直对齐。在表单元格中，这个属性会设置单元格框中的单元格内容的对齐方式.</strong>*

*Vertical-align doesn’t apply to block-level elements like a paragraph inside a `div`*.


如此可知：这个方式确实直观且有效，但其适用范围仅仅限于 table cell 中的内容。

这也是初学者会容易踩坑且十分困惑的一个问题。

**CSS table 中 `Vertical-Align` 垂直居中示例：**


```html
<div class="parent">
    <div class="child">Content here</div>
</div>
```

```css
.parent {display: table;}

.child {
    display: table-cell;
    vertical-align: middle;
}
```

## `Line-Height`

该方法适用于单行文本(或图片)的垂直居中，我们需要做的仅仅是将`line-height`属性设置的大于`font-size`，且等于容器的高度。

```html
<div class="content">
	Text here
</div>
```

```css
.content{
	height:200px; //不必要
	line-height: 200px;
}
```
当然，我们也可以不设置父级元素的高度，而是让子元素将其撑开，同样能达到效果。

同理，图片和单行文本一样，也为`inline`元素，也可以通过设置容器的`line-height`达到居中效果：

```html
<div class="content">
    <img src="image.png" alt="" />
</div>
```

```css
.content {
    line-height: 200px;
}

#parent img {
    vertical-align: middle; //调整基线位置，不是设定垂直居中哦~
}
```

## 绝对定位 and 负 Margin

这里通过绝对定位将目标元素左上角定位在父级元素的中央位置，然后通过设定目标元素的`margin`属性使其中心点与父级元素重合，适用于所有`block`元素。


```html
<div class="parent">
    <div class="child">Content here</div>
</div>
```
```css
.parent {
	position: relative;
	height: 800px;
}

.child {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 30%;
    width: 50%;
    margin: -15% 0 0 -25%; //margin 为负值且为自身尺寸的一半
}
```
然而，使用这种方法经常会出现父级容器中的内容溢出， 所以最好在知道父级元素的宽度和高度时使用该方法。

## 绝对定位 and Stretching

这里通过绝对定位并设置`top`, `bottom`, `right`, and `left` 为 0 ，将目标元素拉伸至父级元素的所有 4 个边。 再设置 `margin` 为 `auto`，使得 上下和左右 `margin` 相等。则实现完全的剧中效果。适用于所有`block`元素。

```html
<div class="parent">
    <div class="child">Content here</div>
</div>
```

```css
.parent {
	position: relative;
	height: 300px;
}

.child {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 50%;
    height: 30%;
    margin: auto;
}
```
这种方法，在IE 8 以下不 work ...

## 绝对定位 and transform3d

这里通过绝对定位将目标元素左上角定位在父级元素的中央位置，然后通过设定目标元素的`transform3d`属性使其中心点与父级元素重合，适用于所有`block`元素。

```html
<div class="parent">
    <div class="child">Content here</div>
</div>
```

```css
.parent {
	position: relative;
	height: 300px;
}

.child {
    position: absolute;
    top:50%;
    left:50%;
    width: 150px;
    height: 130px;
    transform:translate3d(-50%,-50%,0); //向左向上移动自身尺寸的一半
}
```
IE 8 以下不 work ...

## css3 中的 Flex 布局

将父级容器设置为 Flex 容器，并规定子项目的排列方式。详细参见 [Flex 布局教程](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool)

```html
<div class="parent">
    <div class="child">Content here</div>
</div>
```

```css
.parent {
	display: flex;
	display: -webkit-box;
	display: -webkit-flex;
	    
	display: -moz-box;
	display: -moz-flex;
	display: -ms-flexbox;
	    
	/* 子元素主轴（默认为水平轴）上居中*/
	-webkit-box-align: center;
	-moz-box-align: center;
	-ms-flex-pack:center;/* IE 10 */
	-webkit-justify-content: center;
	-moz-justify-content: center;
	justify-content: center;/* IE 11+,Firefox 22+,Chrome 29+,Opera 12.1*/
	    
	/* 子元素交叉轴（默认为纵轴）居中 */
	-webkit-box-pack: center;
	-moz-box-pack: center;
	-ms-flex-align: center;/* IE 10 */
	    
	-webkit-align-items: center;
	-moz-align-items: center;
	align-items: center;
	
	height: 300px;
}

.child {
    width: 150px;
    height: 130px;
}
```

支持 CSS3 的浏览器可用， 由于个浏览器厂商各异，导致各种前缀眼花缭乱。