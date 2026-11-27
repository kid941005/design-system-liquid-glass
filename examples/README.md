# 落地页 Demo（Aura）

用本技能 design-system-liquid-glass 的 assets/tokens.css 与 assets/components.css 构建的响应式落地页示例。

## 打开方式
- 直接双击 index.html；或在本目录起静态服务器：
  python -m http.server 8080
  然后访问 http://localhost:8080/index.html

## 预览图
- _preview-desktop.png（视口 1280，整页截图）
- _preview-mobile.png（视口 390，整页截图）

## 可用交互
- 右上角月/日图标：切换亮色 / 暗色主题
- 「工作方式」Tabs：切换三个面板（指示器滑动）
- 定价「按月 / 按年·省20%」：切换价格（SegmentedControl）
- 「需要加急支持」：Switch 开关
- 「免费开始 / 观看演示」：打开模态（含输入框 / Esc 关闭 / 点遮罩关闭）
- 「收到一条通知试试」/ Dock 铃铛：触发 Toast 通知
- 底部 Dock：液态玻璃 + 水滴融合（鼠标移动时指针水珠跟随/吸附，点击切换选中）

## 文件
- index.html  页面结构（语义化 + 玻璃组件类）
- landing.css 版面、背景光斑、响应式（断点 1000px / 640px）
- landing.js  原生交互（主题/Tabs/计费/开关/模态/Toast/Dock）
