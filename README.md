# 秋谷 OJ

一个复刻洛谷的在线评测（OJ）平台，支持题库、提交、评测、排行榜、用户系统等功能。

## 技术栈
- 前端：React + Ant Design（Netlify静态托管）
- 后端：Netlify Functions（Node.js Serverless）
- 数据库：MySQL
- 评测：第三方API

## 目录结构
```
qiugu/
  frontend/           # React前端项目
  netlify/functions/  # Serverless后端API
```

## 数据库连接
```
mysql://avnadmin:AVNS_CEEdM-Y3_9hUMruXVF0@mysql-393a17f4-qiugu.e.aivencloud.com:21239/defaultdb?ssl-mode=REQUIRED
```

## 快速开始
1. 进入frontend目录，开发/运行前端：
   ```bash
   cd frontend
   npm start
   ```
2. 进入netlify/functions目录，开发/测试Serverless函数：
   ```bash
   cd netlify/functions
   # 安装依赖
   npm install
   # 本地测试（需Netlify CLI）
   netlify dev
   ```
3. 配置Netlify部署，前端和functions自动托管。

## 主要功能
- 题库浏览、搜索
- 题目详情、提交
- 评测结果展示
- 用户注册、登录、信息管理
- 排行榜

## 评测API
- 通过axios调用第三方评测API（需补充API文档）

---

如需详细开发文档和API接口说明，请见各目录下README。 