# Lawera

汪火胜的个人作品集网站，展示个人技能、项目服务与联系方式。

## 技术栈

- **Vue 3** — Composition API + `<script setup>`
- **Vite 8** — 开发与构建
- **Vue Router 4** — 客户端路由
- **Vue I18n** — 中英文国际化
- **GSAP** — 高性能动画

## 功能

- 首页粒子背景 + 动画 Hero
- 个人简介与技能进度条
- 服务展示卡片
- 联系表单（前端校验 + FormSubmit 后端）
- 暗色/亮色主题切换
- 中英文语言切换
- 滚动渐入动画
- 响应式适配（移动端 / 平板 / 桌面）

## 本地开发

```bash
npm install
npm run dev       # 启动开发服务器 → http://localhost:5173
```

## 构建与预览

```bash
npm run build     # 生产构建
npm run preview   # 预览构建结果
```

## 项目结构

```
src/
  assets/         # 静态资源与主题 CSS
  components/     # 公共组件（导航栏、页脚、技能条等）
  composables/    # 组合式函数（useTheme）
  i18n/           # 国际化配置与语言文件
  router/         # 路由配置
  views/          # 页面组件
  App.vue         # 根组件
  main.js         # 应用入口
  style.css       # 全局样式与 CSS 变量
```
