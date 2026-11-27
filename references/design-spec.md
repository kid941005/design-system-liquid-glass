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
| backdrop-filter blur | 16–30px（默认 24） | 背景模糊 |
| saturate | 160%–200% | 提升饱和度 |
| 玻璃面透明度 | 0.45–0.72 | 越低越透 |
| 描边 | 1px rgba(255,255,255,.65/.12) | 边缘厚度感 |
| 顶部内高光 | inset 0 1px 0 rgba(255,255,255,.65) | 玻璃上沿反光 |
| 高光扫掠 | linear-gradient(135deg, rgba(255,255,255,.55) → 透明) | mix-blend-mode: screen |
| 圆角 | 18–28px | 大连续圆角 |

## 8. 跨框架替换
- React：直接用 `assets/ui.tsx`（含 `"use client"`）。
- Vue 3：CSS 原样复用；JSX 换 `<template>`；Switch / SegmentedControl 用 `v-model`；Modal 用 `<Teleport to="body">` 替代 createPortal。
- 原生：`.btn/.card/.switch/.tabs` 样式与状态类可直接用；Switch 点按改 `el.dataset.on` 切换，Tabs 指示器改 `style.setProperty("--i", idx)`。

## 9. 兼容性
- backdrop-filter：Chrome/Edge 76+、Safari 9+（-webkit-）、Firefox 103+；旧环境走降级。
- focus-visible：Chrome 86+、Safari 15.4+、Firefox 85+。
- env(safe-area-inset-*)：iOS 11+。
- ResizeObserver：Chrome 64+、Safari 13.1+、Firefox 69+。

## 10. Dock（液态玻璃 + 水滴融合）
- 结构：`.dock.dock--refract` 玻璃容器 + `.dock__goo`（goo 滤镜层）+ `.dock__drop`（每图标 15px 水珠）+ `.dock__active`（34px 选中水珠）+ `.dock__droplet`（40px 指针水珠）。
- 玻璃：`background: linear-gradient(180deg, rgba(255,255,255,.26), rgba(255,255,255,.07) 55%, rgba(255,255,255,.14))`（暗色 `rgba(40,48,66,.62)→rgba(22,28,42,.42)`），`blur(36px) saturate(220%) brightness(1.12)`；`.dock--refract` 改用 `backdrop-filter: url(#lg-distort) saturate(200%) brightness(1.08)` 做真折射。
- 高光：`linear-gradient(180deg, rgba(255,255,255,.50), transparent 34%)` + 顶部径向 `rgba(255,255,255,.62)` + 底部 `rgba(10,132,255,.10)`，`mix-blend-mode: screen; opacity:.55`。
- goo 滤镜：`feGaussianBlur stdDeviation=5` → `feColorMatrix` alpha 阈值 `0 0 0 20 -8` → `feGaussianBlur 0.6`；层 `opacity:.52`，重叠处形成水面张力颈部。
- 水珠定位：`--dock-x`（指针，JS 设为 `clientX - rect.left - 20`）与 `--dock-active-x`（选中，`slotCenter(i) - 17`），元素 `transform: translateX(var(--dock-x))`。
- 页面需内联 `#dock-goo` 与 `#lg-distort` 两个 SVG filter（`assets/ui.tsx` 的 Dock 已内置；原生示例见 `examples/index.html`）。
- 降级：不支持 `backdrop-filter` 时保留半透明底色；`prefers-reduced-motion` 隐藏指针水珠。

## 11. Liquid Glass 2.0（强玻璃增强层）
- 启用：`assets/components.css` 末尾「Liquid Glass 2.0」层已内置，引入 tokens + components 即生效；不要再手写 rgba+blur 覆盖。
- 五层：① 135° 白渐变底色 rgba(255,255,255,.42→.10→.26)；② `blur(30px) saturate(200%) brightness(1.06)`；③ `::before` 镜面高光（径向+线性，screen，opacity .72）；④ 边缘光 `inset 0 1px 1px rgba(255,255,255,.98)` + `inset 0 0 0 1px rgba(255,255,255,.26)`；⑤ 内反射/色散/颗粒（底部 inset 白光、左右 1px 冷暖色散、5% 噪点）。
- 真折射：`.glass--refract` / `.lg--refract` 用 `backdrop-filter: url(#lg-distort) saturate(190%) brightness(1.06)`；页面须内联 `#lg-distort`（`<GlassDefs/>` 或 SKILL.md 片段）。
- 背景前提：页面必须有彩色渐变/照片/光斑；纯白底玻璃必发灰。
- 验收：玻璃 blur ≥24px + 1px 亮边 + 顶部 1px 内高光；暗色可读；hover/active/focus 可感知；降级不塌陷。
