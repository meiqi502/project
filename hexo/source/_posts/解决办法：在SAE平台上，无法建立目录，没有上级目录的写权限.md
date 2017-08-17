---
title: 解决办法：在SAE平台上，无法建立目录，没有上级目录的写权限
date: 2015-08-07 17:37:30
tags: SAE 写权限
---
    初学wordpress，憧憬着给自己建一个漂亮的个人博客；于是在SAE上申请了个域名，就把wordpress4.0搭建上去了，通过SVN将主题上传后就开始琢磨着写点文章加点图片啥的，然后问题就来了。想在wordpress后台添加图片的时候，报错：“无法建立目录 wp-content/uploads/2014/11。有没有上级目录的写权限？”于是就去百度解决方法；刚开始看到的好多都是怎么修改wp-content文件夹的权限问题，改成777或者755权限模式，然后再数据库里修改upload_path的值等。于是试着改了一下文件的权限，然后到数据库去看，没有找到upload_path，（后来找到了这个upload_path，翻了个页就找到了><|||，当时也是醉了。）。
纠结了很久，又继续摆弄，终于摆弄好了。下面是解决步骤：
1 首先，还没有在SAE创建Domain Storage的就先去新建一个，方法也很简单，进入SAE，进入你的应用，然后在左边服务管理下面找到Storage，接下来就是按照提示新建一个。
2 在应用根目录，创建sae.php；
```
<?php
/* 在SAE的Storage中新建的Domain名，比如“wordpress” */
define('SAE_STORAGE',wordpress);
/* 设置文件上传的路径和文件路径的URL，不要更改 */
define('SAE_DIR', 'saestor://'.SAE_STORAGE.'/uploads');
define('SAE_URL', 'http://'.$_SERVER['HTTP_APPNAME'].'-'.SAE_STORAGE.'.stor.sinaapp.com/uploads');
?>
```
<!--more-->
2 修改wp-includes/functions.php文件
1）找到require( ABSPATH . WPINC . ‘/option.php’ );在这句前添加：
include( ABSPATH . ‘/sae.php’ );  //调用SAE的Storage文件域名设置  //for SAE；
2）然后注释掉如下代码：
```
//$wrapper = null;
// strip the protocol
//if( wp_is_stream( $target ) ) {
//    list( $wrapper, $target ) = explode( '://', $target, 2 );
//}
// from php.net/mkdir user contributed notes
//$target = str_replace( '//', '/', $target );
// put the wrapper back on the target
//if( $wrapper !== null ) {
//    $target = $wrapper . '://' . $target;
//}
```
3）替换成如下代码：
```
//for SAE begin
// from php.net/mkdir user contributed notes
if ( substr($target, 0, 10) == 'saestor://' ) {
return true;
}
$target = str_replace( '//', '/', $target );
//for SAE end
```
4）找到$basedir = $dir;
在前面添加
```
// for SAE begin
$dir = SAE_DIR;
$url = SAE_URL;
//for SAE end
```
5）找到/** * Send a HTTP header to limit rendering of pages to same origin iframes.
在前面添加：
```
// for SAE begin
if ( !function_exists('utf8_encode') ) {
function utf8_encode($str) {
$encoding_in = mb_detect_encoding($str);
return mb_convert_encoding($str, 'UTF-8', $encoding_in);
}
}
//for SAE end
```
到这里，function.php已经修改完毕；
最后，修改wp-admin/includes/file.php；
注释掉如下代码：
```
// Set correct file permissions
//$stat = stat( dirname( $new_file ));
//$perms = $stat['mode'] & 0000666;
//@ chmod( $new_file, $perms );
```
然后上传刷新，问题解决了。
（由于我在新建文件的时候将文件编码设置成了utf-8，导致后来出现了这个错误：
Warning: Cannot modify header information – headers already sent by (output started
at /data1/www/htdocs/469/linmeiqi/1/sae.php:1) in wp-admin/async-upload.php on line 38；
直接将sae.php用记事本打开，另存为的时候选择ANSI编码就可以了。）
原文链接：http://dimcutter.blog.163.com/blog/static/9309329620130713026450/
