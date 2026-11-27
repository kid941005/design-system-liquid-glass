import { motion } from "framer-motion";
import LiquidGlass from "../liquid/LiquidGlass.jsx";
import { useApp } from "../state/app-state.jsx";

export default function CTA() {
  const { dispatch, pushToast } = useApp();
  return (
    <section className="section wrap" id="faq">
      <LiquidGlass className="cta" radius="28px">
        <h2>现在就让界面流动起来</h2>
        <p className="lede">14 天全功能免费，之后随你决定。</p>
        <div className="hero__cta">
          <motion.button className="btn btn--primary btn--lg" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            onClick={() => dispatch({ type: "modal", value: true, kind: "signup" })}>免费开始</motion.button>
          <motion.button className="btn btn--glass btn--lg" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => pushToast("success", "通知已送达", "这条消息来自液态玻璃 Toast。")}>收到一条通知试试</motion.button>
        </div>
      </LiquidGlass>
    </section>
  );
}
