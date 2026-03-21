# 微信 / QQ 内置浏览器检测页

这是一个可直接部署到 Vercel 的纯前端 React 项目，用来检测当前页面是否处于微信或 QQ 内置浏览器中。

一旦命中微信 / QQ UA，页面会提示用户：

- 请返回聊天页面，复制原有地址到浏览器打开
- 按步骤切换到 Safari、Chrome 或系统默认浏览器
- 避免继续停留在微信 / QQ 内置浏览器里进行后续操作

## 技术栈

- React
- Vite
- Vercel

## 本地开发

```bash
npm install
npm run dev
```

默认地址：

```text
http://127.0.0.1:5173
```

## 构建

```bash
npm run build
```

构建产物会输出到 `dist/`，Vercel 可直接识别并部署。

## Vercel 部署

1. 把项目推送到 GitHub、GitLab 或 Bitbucket
2. 在 Vercel 中导入该仓库
3. 保持默认配置即可，Vercel 会自动识别为 Vite 项目
4. 点击 Deploy

默认不需要额外环境变量，也不需要后端服务。

## 项目说明

- 主题色默认使用 `#0a59f7`
- 页面风格贴近 Apple，顶栏带模糊半透明白色效果
- 页面内容不使用居中窄容器，整体占满浏览器可视区域
- 页面内实现了一个 `BrowserCheck` class，用于保存各类浏览器与终端识别结果

## 开发者

- 老三
- www.577622.xyz
