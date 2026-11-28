# 设计规范 · Design Spec（Liquid Glass）

> 人读规范；可直接复制的变量见 `assets/tokens.css`。

## 1. 字体
- 正文字体栈：`-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, "PingFang SC", "Microsoft YaHei", sans-serif`
- 等宽：`ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`

## 2. 配色

### 亮色
| 语义 | 色值 |
|---|---|
| 页面底色 | #EEF2F7 |
| 背景渐变 | linear-gradient(160deg,#E9EEF6,#F7FAFC) |
| 玻璃面 | rgba(255,255,255,.55) |
| 强玻璃 | rgba(255,255,255,.72) |
| 玻璃描边 | rgba(255,255,255,.65) |
| 主文字 | #0A0F1A |
| 次文字 | rgba(10,15,26,.62) |
| 主强调 | #0A84FF |
| 强调按下 | #0060DF |
| 成功/警告/危险/信息 | #30D158 / #FF9F0A / #FF453A / #64D2FF |

### 暗色
| 语义 | 色值 |
|---|---|
| 页面底色 | #05070D |
| 背景渐变 | linear-gradient(160deg,#070B14,#0C1220) |
| 玻璃面 | rgba(28,34,48,.55) |
| 强玻璃 | rgba(40,48,66,.72) |
| 玻璃描边 | rgba(255,255,255,.12) |
| 主文字 | #F5F7FB |
| 次文字 | rgba(245,247,251,.60) |
| 主强调 | #409CFF |

## 3. 字号与字重
| 层级 | 字号 | 字重 | 行高 | 字距 |
|---|---|---|---|---|
| Display | 48px | 700 | 1.05 | -0.02em |
| H1 | 34px | 700 | 1.10 | -0.02em |
| H2 | 28px | 600 | 1.15 | -0.015em |
| H3 | 22px | 600 | 1.20 | -0.01em |
| Body-L | 17px | 400 | 1.50 | -0.006em |
| Body | 15px | 400 | 1.50 | 0 |
| Callout | 13px | 500 | 1.40 | 0.006em |
| Caption | 12px | 500 | 1.35 | 0.01em |
| Overline | 11px | 600 | 1.30 | 0.06em（大写） |

字重档：400 / 500 / 600 / 700。

## 4. 间距与栅格
- 基础 4px；标度 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 / 80。
- 12 列栅格，gutter 24px；页面外边距 24px（移动）/ 32px（桌面）。
- 容器：content 1120px / page 1280px。
- 断点：480 / 768 / 1024 / 1280 / 1440px。

## 5. 圆角 / 边框 / 阴影
- 圆角：xs 6 / sm 10 / md 14 / lg 20 / xl 28 / pill 999（px）。
- 边框：1px；玻璃亮 rgba(255,255,255,.65)，暗 rgba(255,255,255,.12)。
- 阴影：
  - sm：0 1px 2px rgba(8,12,20,.06), 0 1px 1px rgba(8,12,20,.04)
  - md：0 8px 24px rgba(8,12,20,.10), 0 2px 6px rgba(8,12,20,.06)
  - lg：0 24px 60px rgba(8,12,20,.18), 0 8px 20px rgba(8,12,20,.10)
  - 玻璃：外投影 + inset 0 1px 0 rgba(255,255,255,.65) + inset 0 -1px 1px rgba(255,255,255,.08)

## 6. 动效
| token | 值 | 用途 |
|---|---|---|
| --dur-fast | 90ms | 按下 / 切换 |
| --dur-base | 160ms | hover |
| --dur-med | 240ms | 展开 / 淡入 / 指示器 |
| --dur-slow | 320ms | 抽屉 / 大面板 |
| --ease-out | cubic-bezier(.22,1,.36,1) | 快出慢收（通用） |
| --ease-in-out | cubic-bezier(.4,0,.2,1) | 双向位移 |
| --ease-spring | cubic-bezier(.34,1.56,.64,1) | 回弹 / 弹性 |

三态：Hover translateY(-1px) scale(1.01) / Active scale(.97) / Focus-visible 2px 轮廓 + 4px 光晕。

## 7. 液态玻璃参数
| 参数 | 推荐 | 说明 |
|---|---|---|
| 折射 | `var(--lg-refract)`（默认 blur 30px；Chromium 用 url(#lg-distort)） | 真折射位移，非磨砂 |
| 小控件折射 | `var(--lg-refract-soft)`（默认 blur 18px） | 按钮/输入/分段/Tabs |
| saturate | 200% | 提升饱和度 |
| brightness | 1.06 | 玻璃提亮 |
| 玻璃面底色 | 135° 白 .34→.12→.06→.20（暗色 .17→.06→.03→.11） | 越低越透 |
| 镜面高光 | radial 130% 100% at 16% -12% 白 .62 + 135° 白 .30→.06→.16 | 顶部反光 |
| 描边 | 1px rgba(255,255,255,.55)；暗色 .17 | 边缘厚度感 |
| 边缘光 | inset 0 1px 1px rgba(255,255,255,.96) + inset ring .28 | 玻璃上沿/轮廓 |
| 色散 | inset ±1.2px rgba(255,70,120,.12)/rgba(0,170,255,.14) | 冷暖分色边 |
| 圆角 | 18–28px | 大连续圆角 |

## 8. 跨框架替换
- React：直接用 `assets/ui.tsx`（含 `"use client"`）。
- Vue 3：CSS 原样复用；JSX 换 `<template>`；Switch / SegmentedControl 用 `v-model`；Modal 用 `<Teleport to="body">` 替代 createPortal。
- 原生：`.btn/.card/.switch/.tabs` 样式与状态类可直接用；Switch 点按改 `el.dataset.on` 切换，Tabs 指示器改 `style.setProperty("--i", idx)`。

## 9. 兼容性
- backdrop-filter：Chrome/Edge 76+、Safari 9+（-webkit-）、Firefox 103+；旧环境走降级。
- `backdrop-filter: url(#svg-filter)` 真折射已实测于 Chromium（headless Chrome）；Safari/Firefox 未实测，按当前实现预期忽略该值并保留 `-webkit-backdrop-filter: blur(...)` 磨砂降级（**待核实**）。SVG 滤镜内用 `colorInterpolationFilters="sRGB"`，否则色散边偏色不可控。
- focus-visible：Chrome 86+、Safari 15.4+、Firefox 85+。
- env(safe-area-inset-*)：iOS 11+。
- ResizeObserver：Chrome 64+、Safari 13.1+、Firefox 69+。

## 10. Dock（液态玻璃 + 水滴融合）
- 结构：`.dock.dock--refract` 玻璃容器 + `.dock__goo`（goo 滤镜层）+ `.dock__drop`（每图标 15px 水珠）+ `.dock__active`（34px 选中水珠）+ `.dock__droplet`（40px 指针水珠）。
- 玻璃：`background-color: rgba(255,255,255,.14)` + `background-image: var(--lg-specular), radial-gradient(120% 160% at 18% 120%, rgba(10,132,255,.30), transparent 55%), radial-gradient(120% 160% at 82% -30%, rgba(255,80,160,.22), transparent 55%), linear-gradient(180deg, rgba(255,255,255,.28), rgba(255,255,255,.08) 55%, rgba(255,255,255,.16))`（暗色保留 `--lg-specular-dark` + 蓝色内晕）；`.dock--refract` 用 `saturate(220%) brightness(.96)` 压暗白底，暗色页覆盖为 `brightness(1.04)`。
- 边缘/阴影：`inset 0 1px 1px rgba(255,255,255,.96)` + `inset 0 0 0 1px rgba(255,255,255,.38)` + 底部 `inset 0 -10px 18px -14px rgba(8,20,40,.35)` + 冷暖 `inset ±1.2px` 色散 + 外阴影 `0 26px 60px -16px rgba(8,12,20,.40)`、蓝色光晕 `0 18px 40px -18px rgba(10,132,255,.38)`。
- 高光：`.dock::after` `linear-gradient(180deg, rgba(255,255,255,.50), transparent 34%)` + 顶部径向 `rgba(255,255,255,.62)` + 底部 `rgba(10,132,255,.10)`，`mix-blend-mode:screen; opacity:.55`；`.dock::before` 加 112° 斜向镜面 `linear-gradient(112deg, transparent 36%, rgba(255,255,255,.42) 47%, rgba(255,255,255,.08) 54%, transparent 64%)`，`opacity:.55`，置于图标下方。
- goo 滤镜：`feGaussianBlur stdDeviation=5` → `feColorMatrix` alpha 阈值 `0 0 0 20 -8` → `feGaussianBlur 0.6`；层 `opacity:.52`，重叠处形成水面张力颈部。
- 水珠定位：`--dock-x`（指针，JS 设为 `clientX - rect.left - 20`）与 `--dock-active-x`（选中，`slotCenter(i) - 17`），元素 `transform: translateX(var(--dock-x))`。
- 页面需内联 `#dock-goo`、`#lg-distort`、`#lg-distort-soft` 三个 SVG filter：Dock 只内置 `#dock-goo`，两个折射滤镜由根节点 `<GlassDefs/>` 提供；原生示例见 `examples/index.html`。
- 暗色 dock 的 `box-shadow` 必须用 `[data-theme="dark"] .dock, .on-dark .dock` 覆盖：`[data-theme="dark"] .dock` 的 specificity 高于裸 `.dock`，只写后者会被旧阴影吃掉。
- 降级：不支持 `backdrop-filter` 时保留半透明底色；`prefers-reduced-motion` 隐藏指针水珠。

## 11. Liquid Glass 3.0（真折射 / 镜面 / 色散）
- 启用：`assets/components.css` 末尾「Liquid Glass 3.0」层已内置；引入 tokens + components 后，`.glass / .card / .btn--glass / .field__control / .modal / .toast / .seg / .tabs__list / .dock / .nav / .mobilemenu` 全部走 `var(--lg-refract)`，小控件走 `var(--lg-refract-soft)`。不要再手写 rgba+blur 覆盖。
- 页面只需两件事：① 渲染 `#lg-distort` + `#lg-distort-soft` defs；② 在 `:root` 设 `--lg-refract: url(#lg-distort); --lg-refract-soft: url(#lg-distort-soft);`。缺 defs 时不要设变量，默认 blur 安全降级。
- 五层：① 135° 白渐变底色 rgba(255,255,255,.34→.12→.06→.20)；② 真折射 `var(--lg-refract) saturate(200%) brightness(1.06)`；③ 镜面高光（radial 白 .62 + 135° 白 .30→.06→.16，`::before` screen，opacity .62）；④ 边缘光 `inset 0 1px 1px rgba(255,255,255,.96)` + `inset 0 0 0 1px rgba(255,255,255,.28)`；⑤ 内反射/色散/颗粒（底部 inset 白光、左右 ±1.2px 冷暖色散、5% 噪点）。
- 色散滤镜链：`feDisplacementMap result="disp"` → R/G/B 三通道 `feColorMatrix` 分离 → R `feOffset dx=1.2`、B `dx=-1.2` → 两次 `feBlend mode="screen"` 合成。soft 滤镜只位移、不色散（避免小控件文字彩边）。
- 暗色：`.on-dark` 已纳入 tokens 的暗色作用域；组件层另有暗色 specular / 暗色 hover / focus 覆盖，不再出现"hover 闪白"。
- 背景前提：页面必须有彩色渐变/照片/光斑；纯白底玻璃必发灰。
- 验收：gallery 中每个组件 computed `backdrop-filter` 为 `url("#lg-distort")` 或 `url("#lg-distort-soft")`；1px 亮边 + 顶部内高光 + 色散边同时存在；暗色可读；hover/active/focus 可感知；降级不塌陷。
