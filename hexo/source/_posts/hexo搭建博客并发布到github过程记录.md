---
title: hexo搭建博客并发布到github过程记录
date: 2016-08-05
tags:  hexo github
---
### 一、环境
nodejs
git

### 二、注册git，并新建repository
这里只有一点需要注意，我的github账号名是meiqi502，所以新建的repository名字应该是meiqi502.github.io（具体为什么等我搞懂了再来补充，现在先把流程记录）。就是：
```
username.github.io
```
<!--more-->

### 三、创建本机的SSH和github配置
SSH key是用来判断这个github push是否是你本人操作的。每台设备有一个SSH。打开git bash，输入以下命令


第1步：创建SSH Key

$ ssh-keygen -t rsa -C "youremail@example.com"

第2步：登陆GitHub，打开“Account settings”，“SSH Keys”页面：然后，点“Add SSH Key”，填上任意Title，在Key文本框里粘贴id_rsa.pub文件的内容。

第3步：Add Key

### 四、安装hexo
1、 打开git bash，输入命令：
```
npm install -g hexo // 全局安装hexo
```
2、 本地新建文件夹，比如新建hexo，路径为D：/hexo；
3、 进入D:/hexo，右键git bash，并输入命令：
```
hexo init // 初始化hexo
```
这时候打开hexo文件夹会发现所有站点相关的文件都已经被下载下来。
输入命令：
```
hexo g
hexo s
```
浏览器打开 http://localhost:4000 ,可以看到本地hexo博客的样子。（ps：如果本地的4000端口被占用了，可以输入 hexo s -p 5000 来修改端口号。据说如果本地安装了福昕阅读器都会有这个问题）。
4、 本地的站点已经准备好，接下来就是把这个站点发布到github上。打开D:/hexo/_config.yml（不要用记事本打开，编码问题），在文件末尾配置deploy信息，具体如下：
```
deploy:
  type: git
  repository: https://username:password@github.com/meiqi502/meiqi502.github.io.git
  branch: master
```
ps：username是github帐户名，password是github密码。我的hexo版本是3.0，这个配置信息会因为版本不同而稍有区别。具体视版本而定。
5、安装hexo部署器，据说（hexo 3.0版本之前的不需要，没看过官方文档的我没发言权）
```
npm install hexo-deployer-git --save
```
6、执行：
```
hexo g
hexo d
```
然后，浏览器打开 http://meiqi502.github.io 可以看到博客啦。（ps：github在国内的访问速度不是很快，有时候立即访问可能会报错或者网页崩溃。。。（苦脸，被这个坑过））。所以要耐心等待一下。

### 五、写博文
博客搭建好之后就可以开始发布文章了，hexo使用markdown编写方式。所以首先要准备一个好用的markdown编辑器，这里推荐一个自己用的：cmd markdown；这个有客户端也有在线版，非常好用。
在线版本：[https://www.zybuluo.com/mdeditor_light#459840][1]
客户端下载：[https://www.zybuluo.com/cmd/][2]
找到hexo/source/_post；在里面新建md，然后在md编辑器打开并编辑文章。保存后，进入hexo根目录，执行：
```
hexo g
hexo d
```
对，就是这两个命令，也许你已经知道每次要部署的时候就执行这两个命令就行了。。。。（哈哈，你真聪明）。这时候在浏览器上就可以看到你发表的文章啦。

### 六、主题切换
hexo有很多主题，很多非常优秀的开发者都在github上贡献了自己的作品，你可以尽情筛选，选择自己中意的主题。
hexo主题链接：[https://github.com/hexojs/hexo/wiki/Themes][3]
那么选择中意的主题之后怎么运用到自己的博客呢？方法很简单：

 - 把主题克隆到本地hexo站点：
```
git clone <repository> themes/<theme-name>
```
举个例子，我使用的主题的git仓库地址是：https://github.com/iissnan/hexo-theme-next.git，那么就这么写：
```
git clone https://github.com/iissnan/hexo-theme-next.git themes/next
```
 - 配置_config.yml文件的themes选项
在配置文件_config.yml中找到themes字段，然后修改成我们想要的主题的名字，比如next，然后，你懂的，再次执行：
```
hexo g
hexo d
```
然后刷新浏览器，你会发现主题已经成功切换了哦。

### 七、主题的修改和优化
开发中……

### 八、hexo的一些相关命令

### 九、

  [1]: https://www.zybuluo.com/mdeditor_light#459840
  [2]: https://www.zybuluo.com/cmd/
  [3]: https://github.com/hexojs/hexo/wiki/Themes
