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
