---
title: height、style.height和offsetHeight区别
date: 2015-08-07 14:53:50
tags:
---
### 首先贴上测试代码
```
<!DOCTYPE html>
<html lang="en">
    <head>
	<meta charset="UTF-8">
	<title>测试offsetHeight</title>
	<style type="text/css">
	    #box{
		width: 200px;
		height: 200px;
		border: 10px solid #000;
		background: blue;
		margin: 10px;
		padding: 20px;
	    }
	</style>
    </head>
    <body>
	<div id="box" style="height:200px"></div>
    </body>
</html>
<script type="text/javascript">
    window.onload = function(){
	var box = document.getElementById("box");
	var offsetheight = box.offsetHeight;
	var height = box.style.height;
	console.log(height);
	console.log(offsetheight);
    }
</script>
```
<!--more-->
![img](/images/myPic/20160807-2.png)
![img](/images/myPic/20160807-1.png)
### 因此测试发现
1 offsetHeight是元素实际占据的空间高度，即不包括margin的高度，且返回的值是一个整型数值，且是一个只读属性。
2 style.height是元素单纯的高度，即不包括border，padding和margin的高度，且返回的结果是字符串，且是一个读写属性。
3 一直都很疑惑obj.height这个写法到底存不存在，这个输出的值是undefined。
