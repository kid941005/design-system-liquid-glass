import { motion } from "framer-motion";

const ITEMS = [
  { ico: "📊", t: "实时分析", d: "流式指标与漏斗秒级刷新，玻璃卡片里就能看懂每一次点击。" },
  { ico: "⚡", t: "自动化流程", d: "用自然语言描述规则，Aura 自动编排任务并回报结果。" },
  { ico: "🛡️", t: "企业级安全", d: "SSO、审计日志与区域化存储，默认开启，无需额外配置。" }
];

export default function Features() {
  return (
    <section className="section wrap" id="features">
      <div className="section__head">
        <span className="pill">核心能力</span>
        <h2>一切都在同一层玻璃里</h2>
        <p className="lede">不做花哨的功能堆砌，只把最关键的三件事做到极致。</p>
      </div>
      <div className="grid grid--3">
        {ITEMS.map((it) => (
          <motion.article key={it.t} className="card card--interactive feature lg" tabIndex={0}
            whileHover={{ y: -4 }} whileTap={{ scale: 0.995 }}>
            <div className="feature__ico">{it.ico}</div>
            <h3>{it.t}</h3>
            <p>{it.d}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
