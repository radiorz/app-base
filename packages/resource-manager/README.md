# resource-manager
所有的数据都可以认为是一种资源.天然包括类似文件的所有特性
CRUD 更新监听 上传下载 导入导出 都是他们通用的操作.
本质上 资源 管理器其实就是架设在 前端与后端的桥梁
让前端不用再关心具体的后端实现,直接访问资源.
类似一个店铺背后的小仓库,提供给前端应用统一的管理办法


## 资源管理器

所有的资源管理器都包括两种重要角色
- fetcher-syncer 请求资源 同步资源(与远端)
- saver 存储资源 更新资源(本地)
- get refresh 因为我们是资源管理者,所以还有第三方要 访问我们, 这也是
### fetcher
用户通过 resource manager 去请求获取响应, 无需关注彼此之间的协议.

他可能可以使用http进行获取,或者 udp ..

最关键的就是所有不同的连接协议只要实现了 请求响应的模式 甚至回调更新的模式(request/response 和 Sync)
### saver 
本地缓存 更新 被读取等等
当然极端情况下是可以不用的,
## 连接协议客户端
所有的连接协议都需要 auth 的部分,decode encode ,
请求响应模式,track,
比如http客户端
应该包括 
安全
- https 证书验证
- barear 认证等 signin signout
请求响应
- get post put delete 上传下载 导入导出 不过也可以集中为 request
track 
- http 本身没有回调,不过有个 sse的方式也可以,


## 存储协议客户端
可以叫做  db 或者 store


