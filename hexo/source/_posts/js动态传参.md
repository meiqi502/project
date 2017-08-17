---
title: js动态传参
date: 2015-08-07 14:24:34
tags: js 动态传参
---
## 总结一下目前需要动态传参的几种情况：
1 obj.addEventListener()
2 obj.setTimeOut()
3 onclick = callback(“参数”);
### 一、首先，addEventListener()方法调用的函数也是不能直接带参数的，如果需要传入参数，可以有以下方法：
 1 用setAttribute()为元素增添属性，把要传递的参数赋给属性值；然后在所调用函数中加事件参数，如下：
```
deleteTaskk = document.createElement("a");
ii="3";
color="red"
deleteTaskk.setAttribute("moto", ii);
deleteTaskk.setAttribute("color", color);
deleteTaskk.addEventListener("click", deleteTaskCookie, false);
document.appendChild(deleteTaskk);

function deleteTaskCookie(e){//e是事件对象，使用e.target既定义对象，又可以得到触发本事件的元素。
    mycase=e.target
    ii=mycase.getAttribute("moto");
    color=mycase.getAttribute("color");
    ...
}
```
<!--more-->
2 直接让addEventListener调用带参数的函数，然后在所调用函数中返回匿名函数。如下：
```
deleteTaskk = document.createElement("a");
ii="3";
color="red"
deleteTaskk.addEventListener("click", deleteTaskCookie(ii,color), false);
document.appendChild(deleteTaskk);

function deleteTaskCookie(i,colo){
    return function(){
    XXXXX(i)
    XXXXXX(colo)
    ...
    }
}
```
### 二、setTimeOut()动态传参的方法有以下三种：
1 采用字符串形式：——（缺陷）参数不能被周期性改变。
```
setInterval("foo(id)",1000);
```
2 匿名函数包装
```
window.setInterval(function(){foo (id);}, 1000);
```
3 定义返回无参函数的函数
```
function foo(id)
{
   alert(id);
}
function _foo(id){
    return function(){
    foo(id);
    }  
}
window.setInterval(_foo(id),1000);
```
三、在《javascript DOM 编程艺术》里面解释了，第三种情况，因为我们是要将一个函数对象赋值给事件onclick而不是将函数的执行结果赋值。onclick = callback；这是将函数对象本身赋值给左边，而onclick = callback()则是将执行结果赋值给左边。所以正确的写法是：onclick = callback；但是当我们需要在callback函数中传入参数怎么办？这时候onclick = callback(“参数”)是错误的。因此借助匿名函数，我们可以这样写：
onclick = function(){callback(“参数”)};
