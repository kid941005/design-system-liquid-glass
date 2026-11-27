import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useLiquidSupport } from "./useLiquidSupport.js";

// A true liquid-glass surface: backdrop is displaced by the global #lg-distort SVG
// filter (real refraction), plus a pointer-following specular highlight.
export default function LiquidGlass({ as = "div", className = "", radius, children, style, ...rest }) {
  const supported = useLiquidSupport();
  const ref = useRef(null);

  const mx = useMotionValue(28);
  const my = useMotionValue(2);
  const sx = useSpring(mx, { stiffness: 140, damping: 22, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 140, damping: 22, mass: 0.6 });
  const left = useTransform(sx, (v) => v + "%");
  const top = useTransform(sy, (v) => v + "%");

  const Comp = motion[as] || motion.div;

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set(Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100)));
    my.set(Math.max(0, Math.min(100, ((e.clientY - r.top) / r.height) * 100)));
  };
  const onLeave = () => { mx.set(28); my.set(2); };

  const cls = "lg " + (supported ? "lg--live" : "lg--fallback") + (className ? " " + className : "");
  return (
    <Comp ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className={cls}
      style={radius ? { borderRadius: radius, ...style } : style} {...rest}>
      <motion.span className="lg__glare" aria-hidden="true" style={{ left, top }} />
      <span className="lg__edge" aria-hidden="true" />
      {children}
    </Comp>
  );
}
