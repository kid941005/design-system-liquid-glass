import { motion } from "framer-motion";
import LiquidGlass from "../liquid/LiquidGlass.jsx";
import { useApp } from "../state/app-state.jsx";

const BARS = [34, 52, 41, 66, 48, 74, 58, 88, 63, 79, 92, 70];

export default function Hero() {
  const { dispatch } = useApp();
  return (
    <section className="hero wrap" id="top">
      <motion.div className="hero__copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
        <span className="pill">✨ 全新 Liquid Glass 视觉系统</span>
        <h1>让界面<br />像水一样流动</h1>
        <p className="lede">Aura 把分析、协作与自动化装进一层会呼吸的玻璃。背景会被真实折射、拉伸，随指尖流动。</p>
        <div className="hero__cta">
          <motion.button className="btn btn--primary btn--lg" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            onClick={() => dispatch({ type: "modal", value: true, kind: "signup" })}>免费开始</motion.button>
          <motion.button className="btn btn--glass btn--lg" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => dispatch({ type: "modal", value: true, kind: "demo" })}>观看演示 ▶</motion.button>
        </div>
        <div className="hero__meta">无需信用卡 · 14 天全功能 · 随时取消</div>
      </motion.div>

      <motion.div className="hero__preview" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
        <LiquidGlass className="preview" radius="24px">
          <div className="preview__bar">
            <span className="dot dot--r" /><span className="dot dot--y" /><span className="dot dot--g" />
            <span className="preview__title">Aura 控制台</span>
          </div>
          <div className="preview__stats">
            <div className="stat"><span className="stat__label">活跃用户</span><span className="stat__value">12.8k</span><span className="stat__delta">+18%</span></div>
            <div className="stat"><span className="stat__label">转化率</span><span className="stat__value">4.6%</span><span className="stat__delta">+2.1%</span></div>
            <div className="stat"><span className="stat__label">延迟</span><span className="stat__value">38ms</span><span className="stat__delta">-9ms</span></div>
          </div>
          <div className="preview__chart" aria-hidden="true">
            {BARS.map((b, i) => <i key={i} style={{ height: b + "%" }} />)}
          </div>
          <div className="preview__rows">
            <div className="row"><span className="row__av" /><span className="row__t">设计评审 · 版本 3.2</span><span className="tag">进行中</span></div>
            <div className="row"><span className="row__av" /><span className="row__t">增长实验 · 落地页 A/B</span><span className="tag tag--ok">已发布</span></div>
          </div>
        </LiquidGlass>
        <LiquidGlass className="float float--1" radius="14px">▲ +24% 周活</LiquidGlass>
        <LiquidGlass className="float float--2" radius="14px">⚡ 0.4s 首屏</LiquidGlass>
      </motion.div>
    </section>
  );
}
