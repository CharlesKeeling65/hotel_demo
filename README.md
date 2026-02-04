# 易宿 本地原型（示例项目）

## 技术栈

前端：html+CSS

后端：Node.js+mysql数据库

## 项目启动说明

### 数据库启动及配置

#### Mysql安装

版本8.0.33

参考链接

[MySQL8.0最新最全下载及安装配置教程（保姆级）_mysql8.0安装教程-CSDN博客](https://blog.csdn.net/qq_65771647/article/details/147590517)

```shell
C:\Users\ruomiao>mysql --version
mysql  Ver 8.0.33 for Win64 on x86_64 (MySQL Community Server - GPL)
```

#### Datagrip可视化

可视化可以选datagrip或者其他的工具，我用的datagrip

[【2023最新版】DataGrip使用MySQL教程_datagrip连接mysql数据库-CSDN博客](https://blog.csdn.net/m0_63834988/article/details/132725552)

#### 建表

在localhost连接下新建一个query console，把sql\init_schema.sql里的内容复制到里面，ctrl+S保存，Ctrl+A全选后右击—execute执行，执行完以后如果前面都是✅️说明建表成功，有报错自行百度，正常来说一般是配置问题，最好不要改sql语句；成功的话左边localhost下面拉开会出现四张表

![image-20260204160115174](C:\Users\ruomiao\AppData\Roaming\Typora\typora-user-images\image-20260204160115174.png)

![image-20260204160259423](C:\Users\ruomiao\AppData\Roaming\Typora\typora-user-images\image-20260204160259423.png)

![image-20260204160755973](C:\Users\ruomiao\AppData\Roaming\Typora\typora-user-images\image-20260204160755973.png)

#### 插入种子数据

还是像刚才一样新建一个query console，把sql\init_schema.sql下的内容粘进去，保存全选执行，如果成功的话表里应该会有数据（应该除了submission其他都有数据）

![image-20260204160849427](C:\Users\ruomiao\AppData\Roaming\Typora\typora-user-images\image-20260204160849427.png)

### 项目启动

#### node版本

22.19.0

别太低，不然有的库适配不了

![image-20260204161009193](C:\Users\ruomiao\AppData\Roaming\Typora\typora-user-images\image-20260204161009193.png)

#### 启动

```
npm install;
npm start;
```

![image-20260204161157608](C:\Users\ruomiao\AppData\Roaming\Typora\typora-user-images\image-20260204161157608.png)

启动在3000端口

会有一个定向延迟，后续考虑优化一下

```
商家端：user 123456
管理端：admin 123456
```

现在这边是写死的，校验和新增用户还没写

## 已完成功能

- `GET /api/hotels`  酒店列表  ✓ 已实现
- `GET /api/hotels/:id`  酒店详情  ✓ 已实现
- `POST /api/hotels`  新增酒店  ✓ 已实现
- `PUT /api/hotels/:id`  更新酒店  ✓ 已实现
- `DELETE /api/hotels/:id`  删除酒店  ✓ 已实现
- `GET /api/hotels/:id/rooms`  房型列表  ✓ 已实现
- `POST /api/hotels/:id/rooms`  新增房型  ✓ 已实现
- `PUT /api/hotels/:id/rooms/:roomId`  更新房型  ✓ 已实现
- `DELETE /api/hotels/:id/rooms/:roomId`  删除房型  ✓ 已实现
- `GET /api/orders/:hotelId`  获取酒店订单列表  ✓ 已实现

## 待完成功能

审核功能

登录鉴权校验功能、注册功能

管理端一些页面设计

技术栈更换？现在前端没有用框架，后面看看能不能迁移到REACT框架；如果不换的话要把文件、页面拆一拆，整理一下，现在有点乱

图片回显（现在本地换电脑图片不回显，重新上传就好，因为路径给的是本地的路径，后续看能不能往云端部署）

页面细节调整（比如现在如果只有酒店页面会拉的很长；订单那边日期只有当天的，格式也不太配；房型明细那个UI回显有点问题；还有一些UI有点ai痕迹）、还有有的页面还是有点丑，可以再调一调
