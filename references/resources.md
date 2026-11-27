# 资源清单（已逐条核查）

> 许可证为 GitHub 页面 + 原始 LICENSE 文件实测结果；无法确认者标「待核实」，商用前须向作者确认。

## 0. 关于「iOS 27 液态玻璃」
- Liquid Glass 是 Apple 2025 年随 iOS 26 发布的官方设计语言；iOS 27（2026-09-14 发布）延续 / 微调。
- 官方规范在 Apple HIG（Materials 页），但是**人读指导，不含可直接 import 的代码或 token**；本 skill 的第 3/4 节为自建参考实现（替代关系）。
- 参考：HIG Materials https://developer.apple.com/design/human-interface-guidelines/materials ；设计公告 https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/ ；iOS 27 发布 https://www.macrumors.com/2026/09/14/apple-releases-ios-27/

## 1. Design Skill / 设计方法论
| 项目 | 链接 | 解决什么 | 用法 | 许可证 |
|---|---|---|---|---|
| Impeccable | https://github.com/pbakaus/impeccable | 给编码 Agent 的设计词汇（polish/bolder 提升，critique/audit 审查） | 按 README 装入技能，调用命令驱动改版 | Apache-2.0 |
| Web Interface Guidelines | https://github.com/vercel-labs/web-interface-guidelines | 可执行的 Web 界面规则（可访问性/交互/排版/性能） | 放进 Agent 上下文或作为 review 规则 | MIT |
| Claude Design Skills | https://github.com/master5d/claude-design-skills | 设计技能集：UI/UX、排版、动效 | 拷入 .claude/skills 按技能名触发 | 待核实（无 LICENSE） |
| Magic MCP | https://github.com/21st-dev/magic-mcp | MCP：检索 10000+ React/Tailwind 组件并生成 UI | 配置 MCP server 后自然语言找/生成组件 | ISC |
| Anthropic Agent Skills | https://github.com/anthropics/skills | 官方技能仓库 + Agent Skills 标准（agentskills.io） | 参考格式封装自家设计技能 | 待核实（无 LICENSE） |
| Saglitz Design MCP | https://github.com/HalidSaglam/saglitzdesign-mcp | 面向 Agent 的设计/营销知识 MCP（web/iOS/Android/macOS） | 作为 MCP server 接入查询 | 待核实（未检出 LICENSE） |

## 2. UI 模板 / 组件库
| 项目 | 链接 | 技术栈 | 许可证 | 场景 | 移植 |
|---|---|---|---|---|---|
| shadcn/ui | https://github.com/shadcn-ui/ui | React+Tailwind+Radix | MIT | SaaS/官网/后台通用 | 低 |
| Radix Primitives | https://github.com/radix-ui/primitives | React(headless) | MIT | 自建无障碍设计系统 | 中 |
| Magic UI | https://github.com/magicuidesign/magicui | React+Tailwind+Framer | MIT | 营销页/展示型动效 | 低 |
| Tremor | https://github.com/tremorlabs/tremor | React+Tailwind | Apache-2.0 | 仪表盘/图表 | 低 |
| Mantine | https://github.com/mantinedev/mantine | React | MIT | 全量组件库+hooks | 中 |
| Chakra UI | https://github.com/chakra-ui/chakra-ui | React | MIT | SaaS/后台 | 中 |
| Ant Design | https://github.com/ant-design/ant-design | React | MIT | 企业级中后台 | 中 |
| Element Plus | https://github.com/element-plus/element-plus | Vue 3 | MIT | Vue 中后台 | 中 |
| Vuetify | https://github.com/vuetifyjs/vuetify | Vue 3+Material | MIT | Material 风 Vue 应用 | 中 |
| Nuxt UI | https://github.com/nuxt/ui | Vue/Nuxt+Tailwind | MIT | Nuxt 应用（Pro 组件收费） | 中 |
| Tailwind CSS | https://github.com/tailwindlabs/tailwindcss | 框架无关 | MIT | 样式底座 | 低 |
| DaisyUI | https://github.com/saadeghi/daisyui | Tailwind 插件 | MIT | 主题化组件类 | 低 |
| Flowbite | https://github.com/themesberg/flowbite | Tailwind | MIT | 组件+区块（Pro 收费） | 低 |
| liquid-glass-react | https://github.com/rdev/liquid-glass-react | React(SVG 位移) | MIT | 真折射液态玻璃组件 | 低 |
| Liquid UI | https://github.com/guillaume-flambard/liquid-ui | React(@liquid-ui/react) | MIT | Apple 风玻璃组件+token | 低 |
| sohumsuthar/liquid-glass | https://github.com/sohumsuthar/liquid-glass | 原生 CSS/SVG+React | MIT | 物理校准玻璃（Fresnel/色散） | 中/高 |

## 3. 备注
- Superdesign（https://github.com/superdesigndev/superdesign）为 AGPL-3.0，强 copyleft，勿并入闭源分发。
- Flowbite、Nuxt UI 的开源部分为 MIT，其 Pro/Blocks 为付费，注意区分。
