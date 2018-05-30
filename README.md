# blog-backend

这是个人博客的后台项目，并不会在互联网上公开该项目的线上访问地址，但欢迎访问本人的博客网站: [南风有信](http://hinotos.com)
<br>
个人博客的源码请移步至: [GitHub of hinotos.com](https://github.com/notos9312/hinotos.com)
<br><br>
## 更新日志
### 2018-05-03：
> * 【A】contentTitleSchema中增加bSeen属性，新建文章时，bSeen默认为true
> * 【A】TablePanel.vue中增加“是否可视”一列，以滑块switch来表示和控制
> * 【A】新增changebSeen接口
> * 【D】删除远程仓库上的db/db.js文件

### 2018-05-22：
> * 【M】把代码中绝对路径类型的api请求地址改为相对路径的类型

### 2018-05-23：
> * 【M】将nodejs服务器的CROS跨域设置代码注释，不支持跨域

### 2018-05-24：
> * 【M】引入axios，并用axios替换vue-resource
> * 【M】使nodejs服务器的api接受content-type为application/json类型的数据
> * 【D】npm uninstall vue-resource和vuex

### 2018-05-30：
> * 【M】标题列表按文章创建时间倒序输出，越新的文章越靠前

