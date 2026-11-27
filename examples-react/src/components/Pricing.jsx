import { motion } from "framer-motion";
import LiquidGlass from "../liquid/LiquidGlass.jsx";
import Segmented from "./ui/Segmented.jsx";
import Switch from "./ui/Switch.jsx";
import { useApp } from "../state/app-state.jsx";

const PLANS = [
  { name: "Starter", m: 0, y: 0, desc: "个人与小项目", feats: ["5 个看板", "基础分析", "社区支持"], cta: "选择", cls: "btn btn--glass" },
  { name: "Growth", m: 29, y: 23, desc: "成长中的团队", feats: ["无限看板", "自动化流程", "优先支持"], cta: "立即开始", cls: "btn btn--primary", hot: true },
  { name: "Scale", m: 89, y: 71, desc: "大型组织", feats: ["SSO / 审计", "区域化存储", "专属客户成功"], cta: "联系销售", cls: "btn btn--glass" }
];

export default function Pricing() {
  const { state, dispatch, pushToast } = useApp();
  const y = state.billing;
  return (
    <section className="section wrap" id="pricing">
      <div className="section__head">
        <span className="pill">定价</span>
        <h2>按团队规模，透明计价</h2>
        <Segmented className="pricing-seg" layoutId="billing-pill" value={state.billing}
          onChange={(v) => dispatch({ type: "billing", value: v })}
          items={[{ value: "m", label: "按月" }, { value: "y", label: "按年 · 省 20%" }]} />
      </div>
      <div className="grid grid--3">
        {PLANS.map((p) => (
          <motion.article key={p.name} className={"price lg" + (p.hot ? " price--hot" : "")} whileHover={{ y: -4 }}>
            {p.hot ? <span className="price__badge">最受欢迎</span> : null}
            <h3>{p.name}</h3>
            <div className="price__num">
              <span className="amount">{"$" + (y === "m" ? p.m : p.y)}</span>
              <span className="per">/月</span>
            </div>
            <p className="price__desc">{p.desc}</p>
            <ul>{p.feats.map((f, k) => <li key={k}>{f}</li>)}</ul>
            <motion.button className={p.cls} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => {
                if (p.name === "Scale") pushToast("info", "已收到", "销售会尽快与你联系。");
                else dispatch({ type: "modal", value: true, kind: "signup" });
              }}>{p.cta}</motion.button>
          </motion.article>
        ))}
      </div>
      <LiquidGlass className="prefs" radius="20px">
        <div>
          <strong>需要加急支持？</strong>
          <p className="muted">开启后按 4 小时 SLA 响应。</p>
        </div>
        <Switch checked={state.priority} onChange={() => dispatch({ type: "priority" })} label="加急支持" />
      </LiquidGlass>
    </section>
  );
}
