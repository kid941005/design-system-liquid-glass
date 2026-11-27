import { motion } from "framer-motion";
import LiquidGlass from "../liquid/LiquidGlass.jsx";

export default function RefractionDemo() {
  return (
    <section className="section wrap" id="refraction">
      <div className="section__head">
        <span className="pill">真实折射</span>
        <h2>拖动透镜，看背景被真实扭曲</h2>
        <p className="lede">这块玻璃用 SVG 位移滤镜扭曲它背后的画面——是折射与形变，不是模糊。</p>
      </div>
      <div className="refract">
        <div className="refract__bg" aria-hidden="true" />
        <span className="refract__word" aria-hidden="true">LIQUID GLASS</span>
        <motion.div className="lens" drag dragMomentum={false} whileDrag={{ scale: 1.04 }} whileHover={{ scale: 1.03 }}>
          <LiquidGlass className="lens__glass" radius="999px"><span>拖动我</span></LiquidGlass>
        </motion.div>
      </div>
    </section>
  );
}
