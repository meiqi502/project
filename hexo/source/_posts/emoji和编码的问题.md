---
title: emoji和编码相关
date: 2017-08-21 19:30:20
tags: emoji UTF-8 UTF-16 ASCII Unicode
---

>  序：这几天一直在研究emoji，所谓的绘文字。连带着把编码相关的知识也一起补了一遍，记录一下自己学到的东西。

#### 编码
大家熟悉的编码比如UTF-8、UTF-16、UTF-32、ASCII、unicode等，后面还会出现一个不长听到的编码USC-2。首先介绍unicode编码。

#### unicode编码

ASCII是最开始美国人指定的一个编码规范，它用一个字节即8位（bit）来表示常见的英文字符，包括大小写英文字母和数字等一共128个字符。这128个字符的编码范围是00000000-01111111。详情查看[ASCII编码](http://www.asciitable.com/)。

后来文字的种类越来越多，每个国家都有自己的文字，ASCII的8位长度不足以定义那么多文字，而且每种文字都采用ASCII编码的话，会导致同一个ASCII对应的符号会不一样。因此后来的Unicode团队决定开发一套统一标准的编码，就是unicode编码。
<!--more-->
unicode编码是一个庞大的集合，里面每个符号都是对应惟一一个编码。unicode为每个符号指定一个编号，称为码点。码点采用的是十六进制的编码，比如中文的美字的码点就是7F8E，一般unicode的写法是\u+码点或者U+码点。美的unicode码点是\u7F8E或者U+7F8E。
刚才说了unicode是一个庞大的集合，目前的Unicode字符分为17组编排，每组称为平面（Plane），而每平面拥有65536（即216）个代码点。然而目前只用了少数平面。下图是从维基百科上获取的表格。维基[Unicode字符平面映射](https://zh.wikipedia.org/wiki/Unicode%E5%AD%97%E7%AC%A6%E5%B9%B3%E9%9D%A2%E6%98%A0%E5%B0%84)。
![img](https://meiqi502.github.io/images/myPic/piangmian.png);
其中基本多文种平面（BMP）是最开始建立的一个区，包含了我们经常使用的字符。其中中日韩三国文字（CJK）就包括在内。其中常用的汉字所在区间为U+4E00 - U+9FFF，可以从[网站](https://codepoints.net/basic_multilingual_plane)查询到指定字符对应的码点。

unicode从1991年10月发布1.0开始，到现在已经经历了很长时间，并且其字符集一直在增加。2017年6月刚刚发布了最新的一期，10.0版。


#### unicode编码方式

Unidcode的编码方式与ISO 10646的通用字符集概念相对应。目前实际应用的统一码版本对应于UCS-2，使用16位的编码空间。也就是每个字符占用2个字节。这样理论上一共最多可以表示2^16（即65536）个字符。基本满足各种语言的使用。实际上当前版本的统一码并未完全使用这16位编码，而是保留了大量空间以作为特殊使用或将来扩展。后面讲的代理对（surrogate pair）就是使用了BMP中的一个区间来表示高位，因为unicode有些字符采用2字节，有些又采用4字节，那么问题来了，计算机如何判断当前的2字节是一个字符还是应该和后两个字节一起组成字符呢，所以在BMP预留的一段区间U+D800到U+DBFF不指定任何字符的编码，用来辅助完成辅助平面内字符的编码。

上述16位统一码字符构成基本多文种平面。最新（但未实际广泛使用）的统一码版本定义了16个辅助平面，两者合起来至少需要占据21位的编码空间，比3字节略少。但事实上辅助平面字符仍然占用4字节编码空间，与UCS-4保持一致。未来版本会扩充到ISO 10646-1实现级别3，即涵盖UCS-4的所有字符。UCS-4是一个更大的尚未填充完全的31位字符集，加上恒为0的首位，共需占据32位，即4字节。理论上最多能表示231个字符，完全可以涵盖一切语言所用的符号。

基本多文种平面的字符的编码为U+hhhh，其中每个h代表一个十六进制数字，与UCS-2编码完全相同。而其对应的4字节UCS-4编码后两个字节一致，前两个字节则所有位均为0。

关于统一码和ISO 10646及UCS的详细关系，见通用字符集。

#### unicode实现方式
Unicode的实现方式不同于编码方式。一个字符的Unicode编码是确定的。但是在实际传输过程中，由于不同系统平台的设计不一定一致，以及出于节省空间的目的，对Unicode编码的实现方式有所不同。Unicode的实现方式称为Unicode转换格式（Unicode Transformation Format，简称为UTF）

例如，如果一个仅包含基本7位ASCII字符的Unicode文件，如果每个字符都使用2字节的原Unicode编码传输，其第一字节的8位始终为0。这就造成了比较大的浪费。对于这种情况，可以使用UTF-8编码，这是一种变长编码，它将基本7位ASCII字符仍用7位编码表示，占用一个字节（首位补0）。而遇到与其他Unicode字符混合的情况，将按一定算法转换，每个字符使用1-3个字节编码，并利用首位为0或1进行识别。这样对以7位ASCII字符为主的西文文档就大幅节省了编码长度（具体方案参见UTF-8）。类似的，对未来会出现的需要4个字节的辅助平面字符和其他UCS-4扩充字符，2字节编码的UTF-16也需要通过一定的算法进行转换。

再如，如果直接使用与Unicode编码一致（仅限于BMP字符）的UTF-16编码，由于每个字符占用了两个字节，在麦金塔电脑（Mac）机和个人电脑上，对字节顺序的理解是不一致的。这时同一字节流可能会被解释为不同内容，如某字符为十六进制编码4E59，按两个字节拆分为4E和59，在Mac上读取时是从低字节开始，那么在Mac OS会认为此4E59编码为594E，找到的字符为“奎”，而在Windows上从高字节开始读取，则编码为U+4E59的字符为“乙”。就是说在Windows下以UTF-16编码保存一个字符“乙”，在Mac OS环境下打开会显示成“奎”。此类情况说明UTF-16的编码顺序若不加以人为定义就可能发生混淆，于是在UTF-16编码实现方式中使用了大端序（Big-Endian，简写为UTF-16 BE）、小端序（Little-Endian，简写为UTF-16 LE）的概念，以及可附加的字节顺序记号解决方案，目前在PC机上的Windows系统和Linux系统对于UTF-16编码默认使用UTF-16 LE。（具体方案参见UTF-16）

此外Unicode的实现方式还包括UTF-7、Punycode、CESU-8、SCSU、UTF-32、GB18030等，这些实现方式有些仅在一定的国家和地区使用，有些则属于未来的规划方式。目前通用的实现方式是UTF-16小端序（LE）、UTF-16大端序（BE）和UTF-8。在微软公司Windows XP附带的记事本（Notepad）中，“另存为”对话框可以选择的四种编码方式除去非Unicode编码的ANSI（对于英文系统即ASCII编码，中文系统则为GB2312或Big5编码）外，其余三种为“Unicode”（对应UTF-16 LE）、“Unicode big endian”（对应UTF-16 BE）和“UTF-8”。


#### Unicode、UTF-8、UTF-16、UTF-32、USC的关系及转换
UTF（Unicode transformation format）Unicode转换格式，是服务于Unicode的，用于将一个Unicode码点转换为特定的字节序列。常见的UTF有：
> UTF-8 可变字节序列，用1到4个字节表示一个码点 
> UTF-16 可变字节序列，用2或4个字节表示一个码点 
> UTF-32 固定字节序列，用4个字节表示一个码点

UTF-8对ASCⅡ编码是兼容的，都是一个字节，超过U+07FF的部分则用了复杂的转换方式来映射Unicode，具体的转换规则如下：

Unicode符号范围(十六进制) | UTF-8编码方式(二进制)
---|---
0000 0000-0000 007F | 0xxxxxxx
0000 0080-0000 07FF | 110xxxxx 10xxxxxx
0000 0800-0000 FFFF | 1110xxxx 10xxxxxx 10xxxxxx
0001 0000-0010 FFFF | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx

UTF-16对于BMP的码点，采用2个字节进行编码，而BMP之外的码点，用4个字节组成代理对（surrogate pair）来表示。
其中前两个字节范围是U+D800到U+DBFF，后两个字节范围是U+DC00到U+DFFF，通过以下公式完成映射（H：高字节 L：低字节 c：码点） 
```
H = Math.floor((c-0x10000) / 0x400)+0xD800 
L = (c – 0x10000) % 0x400 + 0xDC00
```
UCS（Universal Character Set）通用字符集，是一个ISO标准，目前与Unicode可以说是等价的。 
相对于UTF，UCS也有自己的转换方法（编码）。如

> UCS-2 用2个字节表示BMP的码点 
> UCS-4 用4个字节表示码点

UCS-2是一个过时的编码方式，因为它只能编码基本平面（BMP)的码点，在BMP的编码上，与UTF-16是一致的，UTF-16可看成是UCS-2的父集。在没有辅助平面字符（surrogate code points）前，UTF-16与UCS-2所指的是同一的意思。但当引入辅助平面字符后，就称为UTF-16了。现在若有软件声称自己支持UCS-2编码，那其实是暗指它不能支持在UTF-16中超过2字节的字集。对于小于0x10000的UCS码，UTF-16编码就等于UCS码。
UCS-4则与UTF-32等价，都是用4个字节来编码Unicode。

那么那么多种编码，javascript采用的是什么编码呢？采用的是USC-2编码。即采用2个字节表示一个字符。那么如果是需要4个字节表示的字符，javascript就会认为输入了2个字符。这就造成了javascript在字符串处理的时候会有所不足，之后会讲到。那么如果一个字符，需要2个以上的字节去表示，这时候会采用UTF-16的编码方式。即使用代理对两个16位来表示该码点。具体可以看到这里[wiki](https://zh.wikipedia.org/wiki/UTF-16#UTF-16.E6.8F.8F.E8.BF.B0)。

那么预热了一下编码相关知识，下面呈上主题，绘文字——emoji。

#### 什么是emoji？
绘文字（英语：Emoji，日语：絵文字／えもじ emoji）是使用在网页和聊天中的形意符号，最初是日本在无线通信中所使用的视觉情感符号（图画文字），绘意指图形，文字则是图形的隐喻，可用来代表多种表情，如笑脸表示笑、蛋糕表示食物等。

日本三大电信运营商：NTT DoCoMo、au/KDDI和Softbank各自有不同的绘文字定义。在NTT DoCoMo的i-mode系统电话系统中，绘文字的尺寸是12x12 像素，在传送时，一个图形有2个字节。Unicode编码为E63E到E757。而在Shift-JIS编码则是从F89F到F9FC。基本的绘文字共有176个符号，在C-HTML4.0的编程语言中，则另增添了76个情感符号。au/KDDI的绘文字体系则是通过特别的IMG标签实现。Softbank的绘文字是用SI/SO escape sequence所编码的，softbank的设计能够支持更多的色彩和动画，在日本年轻女孩群体中相当受欢迎。但其所花的流量也较大，相比之下DoCoMo的绘文字是最省流量的。而au/KDDI的绘文字则最有弹性，用户甚至可以自行设计。

#### emoji在unicode中的编码
2010年10月发布的Unicode 6.0版首次收录绘文字编码，其中582个绘文字符号，66个已在其他位置编码，保留作兼容用途的绘文字符号。在Unicode 9.0 用22区块中共计1,126个字符表示绘文字，其中1,085个是独立绘文字字符，26个是用来显示旗帜的区域指示符号以及 12 个(#, * and 0-9)键帽符号。

Unicode 8.0中加入了5个修饰符，用来调节人形表情的肤色。我们可以在[网站](http://getemoji.com/)上查看emoji对应的unicode编码。

然而emoji分散在unicode的多个不连续区块，javascript如何识别emoji？外国以为牛人总结对emoji的各个种类做了整理，最后给出了一个emoji的正则表达式：
```
(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])
```

#### emoji乱码的原因
目前每个系统对emoji的unicode新标准支持程度不一，并且每个系统都有自己单独的一套绘制风格。导致每个平台下同一个含义的emoji并不一样，并且还有可能出现无法显示的情况。

并且目前很多输入法依然采用了softband标准去实现emoji，导致该编码系统无法识别，出现emoji字符乱码的情况。

总结乱码的原因：
第一个原因：目前unicode编码已经将emoji纳入了标准规范，为每个emoji都指定了一个unicode码点，而每个系统对这个标准的支持程度不一，就像各大浏览器对w3c标准的支持不一。
所以导致某些系统上可以显示的emoji在某些平台下是乱码。
第二个原因：目前很多输入法还是采用了最早的emoji编码规范，emoji来源于日本，当时日本有2个emoji编码标准，其中softband目前还有很多输入法在使用。问题来了，系统使用的是unicode的统一编码，
根本无法识别输入的编码到底是什么，所以就用一个框框代替或者干脆显示空白。

#### 解决方法

1. 一个比较简单的解决方法是将softband编码映射到unicode的标准编码就可以显示对应的emoji，并且github上已经有开源的项目在做这个映射。有比较完整的映射关系，直接调用即可[传送门](https://github.com/node-modules/emoji)。
这种方法的优点就是简单易行，不用加载图片和样式。缺点就是依赖系统对unicode标准的支持程度，并且不同平台的例如android和IOS下的emoji表情绘制存在差异。

2. 第二种方法就是维护一个庞大的表情图片库和样式表，根据不同的样式类来展示对应的图片。目前好像手q和微信都是在使用这种方法。
这种方法的有点就是各个平台下看到的表情是一样的，缺点就是实现起来相对复杂，并且需要不断更新表情库和样式。

时间关系，剩下的内容后续补上……


参考：
- http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html
- http://www.ruanyifeng.com/blog/2014/12/unicode.html
- https://zh.wikipedia.org/wiki/UTF-16#UTF-16.E6.8F.8F.E8.BF.B0
- https://codepoints.net/basic_multilingual_plane
- https://zh.wikipedia.org/wiki/Unicode%E5%AD%97%E7%AC%A6%E5%B9%B3%E9%9D%A2%E6%98%A0%E5%B0%84
- http://www.asciitable.com/
- http://www.alloyteam.com/2016/12/javascript-has-a-unicode-sinkhole/
- http://getemoji.com/
- http://unicode.org/
