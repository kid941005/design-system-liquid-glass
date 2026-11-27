---
name: design-system-liquid-glass
description: 当需要构建或美化 Web 界面并采用 iOS Liquid Glass（液态玻璃）风格时使用。提供可直接落地的配色/排版/间距/圆角/阴影 token、强液态玻璃配方与 CSS，以及 Button/Input/Card/Switch/SegmentedControl/Modal/Toast/Tabs/Dock 等 React 组件代码。默认 React + 原生 CSS 变量（非 Tailwind），Vue/原生含替换说明；附经核查许可证的开源资源清单。
---

# Liquid Glass 设计系统（Design Skill）

一套可直接落地的 iOS 液态玻璃风格 Web 设计系统，供 AI 编码助手在「美化界面 / 液态玻璃 / iOS 风格 / 出设计规范」类任务中使用。

## 何时使用
- 用户要求把现有 Web 界面做得更美观，或指定 iOS Liquid Glass / 液态玻璃 / glassmorphism 风格。
- 需要一套具体到色值、字号、圆角、阴影、缓动曲线的设计规范。
- 需要可直接复制的玻璃效果 CSS 与常见交互组件。

## 工作流（照做即可产出强液态玻璃，不要跳步）
1. 读 `references/design-spec.md`，确认配色 / 字号 / 间距 / 圆角 / 阴影 / 动效 token。
2. 样式引入顺序：`assets/tokens.css` → `assets/components.css` → 业务样式。components.css 末尾的「Liquid Glass 2.0」层已内置强玻璃质感，**不要再用旧的 rgba+blur 手写玻璃覆盖它**。
3. **页面背景必须有内容**：高饱和渐变 / 照片 / 彩色光斑。纯白或纯灰底上任何玻璃都会发灰、显脏。
4. 在页面根节点渲染一次 `#lg-distort` 滤镜（React 用 `<GlassDefs/>`，HTML 用下方内联 SVG）。缺它时禁止使用 `url(#lg-distort)`。
5. 所有浮层（导航、卡片、面板、模态、Toast、Dock）统一加 `.glass`（或 `<Glass/>`）；主视觉再加 `.glass--refract` / `<Glass refract/>` 获得真实折射。
6. 组件优先用 `assets/ui.tsx`；Vue / 原生按 design-spec 末节替换。

### 背景示例（直接粘）
```css
body{
  background:
    radial-gradient(60% 50% at 15% 8%,  #7ac7ff 0%, transparent 60%),
    radial-gradient(52% 46% at 86% 18%, #b18cff 0%, transparent 60%),
    radial-gradient(60% 60% at 50% 100%, #6ef0c8 0%, transparent 55%),
    linear-gradient(160deg, #0b1220 0%, #111a2e 100%);
  min-height:100vh;
}
```

### 真折射 defs（React 用 `<GlassDefs/>`；HTML 内联）
```html
<svg class="lg-defs" aria-hidden="true" focusable="false">
  <defs>
    <filter id="lg-distort" x="-25%" y="-25%" width="150%" height="150%" colorInterpolationFilters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.009 0.013" numOctaves="2" seed="7" result="turb"/>
      <feGaussianBlur in="turb" stdDeviation="2.2" result="noise"/>
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="26" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
  </defs>
</svg>
```

## 强液态玻璃配方（必须 5 层，缺一层就是"假玻璃"）
| # | 层 | 作用 | 关键参数 |
|---|----|------|---------|
| 1 | 半透明底色 | 让背后颜色透出 | 135° 白渐变 rgba(255,255,255,.72→.22→.48) |
| 2 | 背景模糊 | 磨砂 + 提饱和 | blur(30px) saturate(200%) brightness(1.06) |
| 3 | 镜面高光 | 玻璃反光感 | ::before 径向+线性白，mix-blend screen，opacity .9 |
| 4 | 边缘光 | 厚度与轮廓 | inset 0 1px 1px rgba(255,255,255,.98) + inset 0 0 0 1px rgba(255,255,255,.26) |
| 5 | 内反射/色散/颗粒 | 真实折射细节 | 底部 inset 白光 + 左右 1px 冷暖色散边 + 5% 噪点 |
| + | 彩色背景 | 玻璃"有东西可折射" | 见上方背景示例 |

全部已封装在 `assets/components.css` 的 `.glass / .card / .btn--glass / .dock` 中；真折射开关是 `.glass--refract`。

## 反面清单（自查是否踩坑）
- 纯白背景 + 只 `backdrop-filter: blur` → 灰雾，不像玻璃。
- 只有 `border-radius` + `background: rgba(255,255,255,.1)`，没有 inset 高光/边缘光 → 塑料片。
- 用大面积 `rgba(255,255,255,.9)` 不透明 → 直接不是玻璃。
- 所有玻璃同一固定高光，不随指针/滚动变化 → 死板。
- 忘了 defs 却写 `url(#lg-distort)` → 该元素背景完全不模糊。
- 把玻璃放在同色背景上 → 对比不足，看不出层次。

## 验收检查表（交付前逐条自检）
- [ ] 页面背景为彩色/图像/渐变，且至少 2 个彩色光斑。
- [ ] 可见玻璃表面 ≥3 处；每处同时具备：blur ≥24px、1px 亮边、顶部 1px 内高光。
- [ ] 主视觉（nav / hero / dock）使用 `.glass--refract` 或等效 SVG 位移滤镜。
- [ ] 暗色模式下玻璃仍可读，边框与高光不消失。
- [ ] hover / active / focus-visible 三态可感知，时长取 `--dur-*`、曲线取 `--ease-*`。
- [ ] 不支持 backdrop-filter 时降级为半透明纯色，不塌陷。
- [ ] `prefers-reduced-motion` 下关闭位移/动画。

## 关键约束
- 颜色 / 圆角 / 阴影一律用 CSS 变量（tokens.css），禁止硬编码魔法值。
- 交互三态齐全：hover / active / focus-visible；尊重 `prefers-reduced-motion`。
- 不支持 `backdrop-filter` 时降级为半透明纯色（components.css 已内置 `@supports`）。
- 真折射需 SVG `feDisplacementMap`；纯 `backdrop-filter` 只能模糊+提亮，不能位移背景。

## 文件结构
```
design-system-liquid-glass/
├─ SKILL.md
├─ README.md
├─ references/
│  ├─ design-spec.md
│  └─ resources.md
├─ assets/
│  ├─ tokens.css        # 亮/暗色变量 + Liquid Glass 2.0 参数
│  ├─ components.css    # 玻璃/按钮/输入/卡片/开关/分段/模态/Toast/Tabs/Dock + 强玻璃增强层
│  └─ ui.tsx            # React 组件（含 GlassDefs/Dock）
├─ examples/            # 静态落地页 demo（HTML/CSS/JS，开箱即看）
│  └─ index.html / landing.css / landing.js / README.md / skill-smoke/
└─ examples-react/      # React + Vite + framer-motion 真折射交互 demo
   └─ src/… / README.md
```

## 示例 Demo
- `examples/`：零依赖静态落地页，直接打开 `index.html`；`examples/skill-smoke/index.html` 是仅用 tokens+components 拼出的最小强玻璃样板，可直接对照。
- `examples-react/`：React + Vite + framer-motion 交互版，含真实折射、可拖动透镜、Dock 水滴融合、模态/Toast/Tabs/价格切换；`npm i && npm run dev`，详见其 README。
