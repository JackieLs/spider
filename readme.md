#### 做spider总结
之前没有做过，所以这次做遇到了很多坑。整体的思路就是先爬到company/id的url。
再爬company/id这些页面中的的真正的主页。

#### 遇到的问题
- 对方的服务器设置了userAgent的屏蔽，直接访问会被拒绝。
- 过于大量密集的访问会被封ip地址，这耽误了一段时间。
- 页面有时候是http的有时候是https的，可能跟itjuzi的服务器设置有关系。

#### 可以提升的地方
- 整个项目都是手动完成的，应该可以写成回调+自动化的方式爬到数据。

#### 关于爬到招聘页
- 这个任务我没有完成，虽然我能想到“加入我们”这个关键字，但是页面直爬到了3个，所以很低，想不明白是哪里出了问题，比如join us关键字，或者在二级页面里面，没有深入尝试。
http://cdn.jin10.com/zhaopin/index.html
http://www.yiqihuzhu.com/join.html
http://www.zhaorenbang.com/index.php/?m=join&a=join_us&alias=join_us

#### 时间
- 整个时间零零散散的加在一起大概有10个小时了吧。