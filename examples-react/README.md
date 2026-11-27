# Aura · Liquid Glass（React + Vite + framer-motion）

把 examples/ 的静态落地页升级为可交互的 React 版本，玻璃改用真正的折射（SVG 位移滤镜），而非磨砂模糊。

## 运行与预览
- cd examples-react
- npm install
- npm run dev       开发服务器 http://localhost:5173
- npm run build     产出 dist/（本机实测 407 modules，无报错）
- npm run preview   预览构建产物 http://localhost:4173

## 目录与职责
- index.html                 入口，挂载 #root
- vite.config.js             Vite + @vitejs/plugin-react
- src/main.jsx               React 入口；按序引入 tokens / components / landing / liquid 四份 CSS
- src/App.jsx                组装页面（Nav / Hero / Logos / RefractionDemo / Features / WorkflowTabs / Pricing / CTA / Footer / Dock / Modal / Toasts）
- src/state/app-state.jsx    useReducer + Context：theme/tab/billing/priority/modal/toasts/quality，及 pushToast
- src/liquid/useLiquidSupport.js  检测 backdrop-filter 是否支持 url(#filter)
- src/liquid/GlassFilterDefs.jsx  全局 SVG 滤镜 #lg-distort（feTurbulence + feGaussianBlur + feDisplacementMap），rAF 调制
- src/liquid/LiquidGlass.jsx  玻璃表面组件：折射类 + 指针跟随高光（framer useSpring/useTransform）
- src/components/Nav.jsx      顶部玻璃导航 + 移动端菜单 + 主题/动效切换
- src/components/Hero.jsx     首屏 + 玻璃预览卡 + 悬浮玻璃片
- src/components/RefractionDemo.jsx  可拖动"透镜"，在高频条纹/文字上展示真实折射
- src/components/Features.jsx / WorkflowTabs.jsx / Pricing.jsx / CTA.jsx / Footer.jsx / Dock.jsx
- src/components/Modal.jsx / Toasts.jsx   模态与 Toast（AnimatePresence 进出场）
- src/components/ui/Segmented.jsx / Switch.jsx  framer layoutId 药丸指示器 + 弹簧开关
- src/styles/liquid.css       真玻璃层与组件覆盖（.lg / .lg--fallback / .lg__glare / .refract / .segx / .swx）
- 复用技能资产：../../assets/tokens.css、../../assets/components.css、../../examples/landing.css

## 状态管理（原"待补充"决定）
选用 React 内置 useReducer + Context，无第三方状态库：状态集中、可预测，规模足够。
若团队更偏外部库，可平移到 Zustand（把 reducer + dispatch 换成 create store，组件改用选择器），改动局限于 app-state.jsx 与各组件读取处。

## 液态玻璃实现（关键点 / 失效边界）
1) 折射：一个全局 SVG filter，用 feTurbulence 生成噪声 → feGaussianBlur 柔化 → feDisplacementMap 以噪声位移 SourceGraphic；通过 backdrop-filter: url(#lg-distort) 作用于元素"背后的真实画面"，产生真实扭曲与拉伸（非 blur）。
2) 颜色与光感：叠加 saturate(180%) brightness(1.05)，另有 ::before 静态高光、.lg__edge 内描边。
3) 流体动画：rAF 约 11fps 轻调 feTurbulence.baseFrequency 与 feDisplacementMap.scale，画面缓慢流动；quality=low 时停止。
4) 随动：LiquidGlass 用 framer 的 useMotionValue+useSpring+useTransform 让高光跟随指针滑动，玻璃像被手指"照亮"。
5) 可拖动透镜：RefractionDemo 中 motion.div drag，在条纹+大字背景上拖动，折射一目了然（见 _preview-refraction.png）。
失效边界：backdrop-filter 接受 url() 目前仅 Chromium 系（Chrome/Edge/部分 Opera）稳定；Firefox、Safari 不支持，会走 fallback。

## 降级方案（原"待补充"决定）
- 能力检测：useLiquidSupport 试写 backdrop-filter: url(#lg-distort)，不支持则加 .lg--fallback，回退到技能原本的 .glass 磨砂（blur+saturate），布局与交互不变。
- 性能降级：启动时按 prefers-reduced-motion / hardwareConcurrency / deviceMemory 自动选 quality=low（静态折射、不跑 rAF）；导航"动效·高/低"可手动切换；MotionConfig reducedMotion="user" 让 framer 尊重系统设置。
- 低端或禁用 backdrop-filter：仍保留半透明背景与描边，视觉退化为普通玻璃卡片。

## 与设计令牌的冲突及处理（未静默修改）
- 技能 .glass/.card 原为 backdrop-filter: blur()；本版本将其升级为 url() 折射，并把玻璃底色透明度降到 rgba(255,255,255,.10)（暗色单独 token 为 rgba(18,24,38,.42)），以便透视背景。
- .lg 基础为 radius 28 / position relative；对 .nav（pill + sticky）、.dock（fixed / 22）、.float（absolute）做了半径与定位覆盖，避免破坏原布局。
- 原 .toast 的 CSS 关键帧动画被禁用，交给 framer AnimatePresence 驱动，避免双重动画。

## Dock 水滴融合（增强）
- 单个图层内放 per-item 小水滴 + 跟随指针的水滴 + 活动水滴，统一经 SVG goo 滤镜合并：feGaussianBlur stdDeviation=5 → feColorMatrix alpha 阈值 (0 0 0 20 -8) → 轻模糊 0.6；重叠处出现"表面张力"颈部。goo 层整体 opacity .62，保持半透明水感。
- 指针在 Dock 上移动时，水滴水滴与各图标小水滴、活动水滴相互吸附/分离；framer spring 平滑追随。
- 文件：src/components/Dock.jsx（几何常量 ITEM=44 / GAP=6 / PAD=8，slotCenter）；src/styles/liquid.css（.dock__goo/.dock__drop/.dock__active/.dock__droplet）；滤镜 id=dock-goo。

## 验证
- 折射证据：_preview-refraction.png（透镜内条纹与 "GLASS" 字样明显扭曲变形）
- 交互冒烟（headless 实测）：按月/按年价格切换 29→23、89→71；Tab 切换面板为"坐等结果"且 aria-selected 正确；开关 aria-checked=true；模态打开标题"创建账户"、Esc 关闭；Toast 计数=1；主题 light→dark。全部通过。
- 构建：vite build 无报错。
