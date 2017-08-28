---
title: javascript进制转换
date: 2017-08-22 13:03:20
tags: parseInt toString charCodeAt codePointAt fromCharCode fromCodePoint
---
在javascript中，parseInt和toString用来转换进制，其中parseInt是传入一个字符串，并指定该字符串中的数字采用了什么进制，最后返回转换成了10进制的整形数字，如果传入的字符串无法转换，则返回NAN。
<!--more-->

#### parseInt 其他进制转成10进制
1. 参数：
- string

要被解析的值。如果参数不是一个字符串，则将其转换为字符串(使用  ToString 抽象操作)。字符串开头的空白符将会被忽略。
- radix

一个介于2和36之间的整数(数学系统的基础)，表示上述字符串的基数。比如参数"10"表示使用我们通常使用的十进制数值系统。始终指定此参数可以消除阅读该代码时的困惑并且保证转换结果可预测。当未指定基数时，不同的实现会产生不同的结果，通常将值默认为10。

2. 返回值

返回解析后的整数值。 如果被解析参数的第一个字符无法被转化成数值类型，则返回 NaN。

#### parseInt什么时候返回NAN

1. parseInt的第二个参数规定传入一个介于2和36之间的整数(数学系统的基础)，如果传入此区间之外的数值，函数会返回NAN。
2. 当parseInt('0x', 16)也会返回NAN。
3. 如果第一个字符不能被转换成数字，parseInt返回NaN。

#### parseInt的一些解析规则：

++如果 parseInt 遇到了不属于radix参数所指定的基数中的字符那么该字符和其后的字符都将被忽略。接着返回已经解析的整数部分。parseInt 将截取整数部分。开头和结尾的空白符允许存在，会被忽略。++

在没有指定基数，或者基数为 0 的情况下，JavaScript 作如下处理：

- 如果字符串 string 以"0x"或者"0X"开头, 则基数是16 (16进制).
- 如果字符串 string 以"0"开头，基数是8（八进制）或者10（十进制），那么具体是哪个基数由实现环境决定。ECMAScript 5 规定使用10，但是并不是所有的浏览器都遵循这个规定。因此，永远都要明确给出radix参数的值。(目前知道的，在小木下，以0开头的字符串使用parseInt时，如果不指定radis，则以8进制解析。)

- 如果字符串 string 以其它任何值开头，则基数是10 (十进制)。


```
parseInt('0x110', 16);  //272

parseInt('0110', 8);  //72

parseInt('0110', 10);  //110

parseInt('0x110', 8);   //除了传入16或者不传，传入其他返回都为0.
```

#### toString 十进制转成其他进制

```
(72).toString(8); //110 转成8进制
```
#### 将字符转成unicode

- StringObject.charCodeAt() 返回0-65535内的整数（字符对应的10进制值），如果unicode的值超出0x10000，则返回代理对的高位，即左数第一位。
- StringObject.codePointAt() unicode的值超出0x10000的字符，也能够正确返回它的10进制值。

💩的unicode编码是\u1f4a9
```
var a = "💩".charCodeAt(0);
console.log(a);
console.log(a.toString(16));

var b = "💩".codePointAt(0);
console.log(b);
console.log(b.toString(16));

运行结果：
55357
"d83d"
128169
"1f4a9"
```
导致这个差异的原因是javascript采用的是USC编码，采用2个字节表示在0-65535范围内的字符。而超出范围的则需要使用代理对表示，这时是4个字节。而charCodeAt只能返回0-65535范围的整数。

来自MDN：
> charCodeAt() 方法返回0到65535之间的整数，表示给定索引处的UTF-16代码单元 (在 Unicode 编码单元表示一个单一的 UTF-16 编码单元的情况下，UTF-16 编码单元匹配 Unicode 编码单元。但在——例如 Unicode 编码单元 > 0x10000 的这种——不能被一个 UTF-16 编码单元单独表示的情况下，只能匹配 Unicode 代理对的第一个编码单元) 。如果你想要整个代码点的值，使用 codePointAt()。

#### 将unicode转成字符
- String.fromCharCode()
- String.fromCodePoint()

分别对应于以上的两个方法，下面是两个函数的用法：

```
var a = String.fromCharCode(128169);
console.log(a);

var b =String.fromCodePoint(128169);
console.log(b);

运行结果：
""
"💩"
```
同样是存在和上面一样的问题，所以如果需要类似操作的时候，最好使用charCodeAt和fromCodePoint。这是ES6的新函数。