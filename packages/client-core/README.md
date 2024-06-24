# client-Core

客户端本身其实最重要的是对客户端本身，设备的服务和子设备的配置与管理(启动暂停重启关闭)
抽象起来，客户端其实就是业务模块与底层服务的管理

```plantuml
@startuml

@enduml
```

对象

```
const client = {
  ios:[],
  services: {},
  drivers: {},// 驱动
  // 模块 模块可能具备client的所有能力
  modules: {},
  stores: {},
  logger: {},
}

const io =await createIO()
client.useIO(io)
const store = new Store()
client.useStore(store)
const am = actionManager()
am.addAction()
client.am = am;

```

具体如下：

- 客户端底层服务(业务无关的底层依赖) 一般是各种连接客户端或者驱动

  - 配置 config
  - 底层服务封装 base-services
    - （状态与错误）这些底层的服务的异常会影响多个顶层服务，所以需要有完备的状态与错误处理逻辑。
  - 网络协议的基础封装 connectors
    - http
    - ws
    - mqtt
  - 本地存储 store
    - 内存数据库(所谓状态管理) 增删改查(树，基础 model 的关系)
    - 磁盘数据库
  - 日志 logger
    - 本地日志
    - 远程日志
  - 底层硬件交互驱动 drivers
    - 热敏
    - gpio
    - 串口

- 客户端基础服务与协议（不直接涉及业务）互相也是解耦的

  - 服务管理
  - 基础服务封装
  - 父子设备管理(远程或本地)

  - 注册与认证协议 protocals
  - 配置协议
  - 字典协议
  - 事件协议
  - 网络通信/请求响应协议(http)

  - 本地逻辑/外部动作分发 本地动作触发(管理型设备才有)
  - 本地逻辑/本地事件触发 外部事件分发
  - 网络服务(管理本地 ip 网络等)
  - 网络通信/消息接收转发协议(消息的处理其实是具体服务中进行处理)
  - 本地通信/gpio 协议
  - 设备异常处理协议
  - 本地存储/日志存储 消息存储 各种存储

- 业务服务封装（涉及业务的服务）包括 配置 消息 请求 业务服务间是解耦的 可以随便关闭或开启 秉持最小化原则，就是啥服务不起或异常 不影响基础设备
  - 设备发现服务
  - 设备异常处理服务（告警等）
  - UI 服务（就是配置一下主题等）
  - 业务服务本身定义（消息，请求，动作等的定义）
  - 通话服务
  - 资源获取服务
  - 配置服务（远端配置同步,本地配置存储，对服务进行配置与管理）
  - 定时任务服务
  - 父子设备逻辑封装（设备间关联服务）

## 服务

子设备

子设备的特点就是具备属性变更,动作下发的设备,而远端信息,资源则通过父设备进行获取(当然也可以单独去处理,单独处理就是真的设备)
所以设备也要做好"服务器/代理"的工作

从这方面来说甚至可以让绑在设备上的子设备(通过线直接连接),甚至可以让网络设备与本地子设备绑定进行同步响应,当然一般这种情况比较少(比如主机报警,从设备也报警亮灯)
也就是子设备是自由的.
最重要的就是取决于这个功能到底是独立的设备(设施)还是这个主设备的一个功能.比如通话,其实也可以看做一个虚拟通话子设备,绑定在这个设备上.

```

```

## 怎么定义插件系统

- core 提供 hooks 对生命周期进行定义 ，这个很普遍，在 vue react fastify 都有这个身影 当然 react 可以看到 生命周期应该尽量简化主要在于 create 也就是初始化 update 更新 destroyed 销毁。

看了 device 的实现

- logger
- emitter on off ...
- config load(from remote/local/default) set get has watchChange
  - store 一般是内存 store 有时候可能会用到 其他 store
  - config schema validate load set get
    - schema 除了校验 还有其他几个功能
      - private 当 config 更新的时候是否反馈给 remote
      - soft 软更新 硬更新
- status 各种状态管理 但是我们可以简化 service 或者 plugin 的 status 自己管理

- hook
  - new created 创建
  - start 启动 
    - config ready( load config)
  - config update
  - config reset(clear)
  - config paused 暂停
  - stop 停止
  - destroyed 销毁
- service get getStatus
  - action server
  - message server /client （消息收发）
    - 实现技术 mqtt
  - db
    - 实现技术 sqlite
  - http client
  - http server
  - finder  设备发现服务 主要给设备发一下初始配置 不然他不知道服务器是哪是哪 本身的网络配置
  - keepalive server
跟设备打交道的都知道 使用他们的功能经常需要用到乱七八糟的库
我们规定 服务
都包括

- config 
- action remote/local
- status
- message protocal 就是通用的一些逻辑 
  - 收消息
    - 解包 
    - 最后都会会落实转化成 action ，更新status config等。 
  - 发送 protocal 最重要的就是消息
    - 
    - 打包 添加协议字段
- request 主要是获取信息 这个其实没什么协议 但是就是常用的增删改查 / 登录认证权限 可以封装一下
- hook 在设备的每个节点做一些事情。
