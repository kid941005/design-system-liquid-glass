---
name: design-system-liquid-glass
description: 当需要构建或美化 Web 界面并采用 iOS Liquid Glass（液态玻璃）风格时使用。提供可直接落地的配色/排版/间距/圆角/阴影 token、液态玻璃参数与 CSS，以及 Button/Input/Card/Switch/SegmentedControl/Modal/Toast/Tabs/Dock 等 React 组件代码。默认 React + 原生 CSS 变量（非 Tailwind），Vue/原生含替换说明；附经核查许可证的开源资源清单。
---

# Liquid Glass 设计系统（Design Skill）

一套可直接落地的 iOS 液态玻璃风格 Web 设计系统，供 AI 编码助手在「美化界面 / 液态玻璃 / iOS 风格 / 出设计规范」类任务中使用。

## 何时使用
- 用户要求把现有 Web 界面做得更美观，或指定 iOS Liquid Glass / 液态玻璃 / glassmorphism 风格。
- 需要一套具体到色值、字号、圆角、阴影、缓动曲线的设计规范。
- 需要可直接复制的玻璃效果 CSS 与常见交互组件。

## 工作流
1. 先读 `references/design-spec.md` 了解配色 / 字号 / 间距 / 圆角 / 阴影 / 动效 token。
2. 把 `assets/tokens.css` 引入项目根样式（含亮/暗色变量）。
3. 引入 `assets/components.css`（玻璃、按钮、输入、卡片、开关、分段、模态、Toast、Tabs、Dock）。
4. 组件优先用 `assets/ui.tsx` 的实现（React，顶部含 `"use client"`）；Vue / 原生按 design-spec 末节替换。
5. 需要选型其它开源库时读 `references/resources.md`，注意许可证与「待核实」标记，勿商用未确认项。

## 关键约束
- 颜色 / 圆角 / 阴影一律用 CSS 变量（tokens.css），禁止硬编码魔法值。
- 交互三态齐全：hover / active / focus-visible；尊重 `prefers-reduced-motion`。
- 不支持 `backdrop-filter` 时必须降级为半透明纯色（components.css 已内置 `@supports`）。
- 真折射（透镜扭曲）需 SVG feDisplacementMap（可用 liquid-glass-react）；纯 backdrop-filter 只能做模糊 + 提亮。

## 文件结构
```
design-system-liquid-glass/
├─ SKILL.md
├─ README.md
├─ references/
│  ├─ design-spec.md
│  └─ resources.md
├─ assets/
│  ├─ tokens.css
│  ├─ components.css
│  └─ ui.tsx
├─ examples/            # 静态落地页 demo（HTML/CSS/JS，开箱即看）
│  ├─ index.html / landing.css / landing.js / README.md
└─ examples-react/      # React + Vite + framer-motion 真折射交互 demo
   ├─ index.html / package.json / vite.config.js
   ├─ src/…
   └─ README.md
```

## 示例 Demo
- `examples/`：零依赖静态落地页，直接打开 `index.html` 即可看效果，适合快速取样式。
- `examples-react/`：React + Vite + framer-motion 交互版，含真实折射（SVG feDisplacementMap）、可拖动透镜、Dock 水滴融合（goo 滤镜）、模态/Toast/Tabs/价格切换等；`npm i && npm run dev` 运行，详见其 README。

## 验收
- 页面主色 / 文字 / 圆角 / 阴影全部来自 token 变量。
- 玻璃组件在亮 / 暗色下均可读，hover / active / focus 可感知。
- 无 backdrop-filter 环境下有降级、不塌陷。
- 交互时长与曲线取 `--dur-*` / `--ease-*`。
