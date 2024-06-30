# Mredust Online Judge - 在线判题

基于**Spring Boot + MQ + Sa-Token + Docker + (React + Ant Design Pro)** 的编程题目评测系统。

在系统前台，管理员可以创建、管理题目，用户可以搜索、查看题目，编写代码并进行在线自测和提交。

在系统后端，自主实现**原生代码沙箱**，能够根据接收的测试用例对代码进行编译、运行并给出输出结果。代码沙箱作为独立服务，可以提供给其他开发者使用。

- 前端代码仓库：https://github.com/Mredust/mredust-oj-frontend
- 后端代码仓库：https://github.com/Mredust/mredust-oj-backend
- 代码沙箱仓库：https://github.com/Mredust/mredust-code-sandbox



## 技术栈

### 前端：

- React 18
- Umi 4.x
- Ant Design 4.x 组件库
- Ant Design Pro Components 高级组件
- Ant Design Charts 图表
- TypeScript 类型控制
- Eslint 代码规范控制
- Prettier 美化代码

依赖库：

- monaco-editor 代码编辑器
- bytemd Md编辑器



### 后端：

- Spring Boot 2.7.x
- MyBatis Plus 3.5.x
- MySQL 8.x
- Spring AOP
- RabbitMQ
- Redis

依赖库：

- Apache Commons Lang3：工具库
- Hutool：工具库
- Gson：Json 解析
- Knife4j：接口文档生成
- validation：校验工具
- Redisson: 分布式服务
- Sa-Token: 安全管理



## 快速启动

### 前端：

- 安装依赖

```shell
npm install
```

- 运行

```shell
npm run dev
```

- 打包

```shell
npm run build
```



### 后端：

1. 运行 sql 目录下的数据文件
2. 修改 application.yml 中的数据库地址
3. 安装完 Maven 依赖后，直接运行即可
4. 已经编写好了 Dockerfile，支持 Docker 镜像部署。



## 模块设计

- 用户管理
- 题库管理
- 代码沙箱



## 主要功能设计

### 前端

- 选用[ByteMD](https://github.com/search?q=bytemd&type=repositories)开源的Markdown文本编辑器组件，引入相关插件并进一步封装提高可复用性，实现题目内容及答案的编辑功能。
- 选用[Monaco Editor](https://github.com/microsoft/monaco-editor)开源代码编辑器组件，实现用户编写代码功能，支持多种语言的高亮。

### 后端

- 自主设计原生代码沙箱，通过**工厂模式 + 模板方法 + Spring配置化**的方式实现多种代码沙箱灵活调用，并通过**策略模式**实现用户对不同语言的代码判题服务。
- 选用[Sa-Token](https://sa-token.cc/doc.html#/)框架实现基本的用户鉴权。
- 选用**RabbitMQ**实现**判题队列**、**死信队列**。
- 选用**Redisson**实现用户提交题目限流操作。



## 效果预览

![](https://vip.helloimg.com/i/2024/06/30/6681161396611.png)



![](https://vip.helloimg.com/i/2024/06/30/668116b3af4be.png)



![](https://vip.helloimg.com/i/2024/06/30/668117a8b418f.png)



![](https://vip.helloimg.com/i/2024/06/30/668116b7845e2.png)



![](https://vip.helloimg.com/i/2024/06/30/668116ba9fac7.png)



![](https://vip.helloimg.com/i/2024/06/30/668116bdb09cd.png)



![](https://vip.helloimg.com/i/2024/06/30/668116c0a02a7.png)



![](https://vip.helloimg.com/i/2024/06/30/668116c4bb995.png)
