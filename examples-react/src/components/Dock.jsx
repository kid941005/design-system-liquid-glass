import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useApp } from "../state/app-state.jsx";

const ITEMS = [
  { icon: "🏠", label: "首页" },
  { icon: "📈", label: "分析" },
  { icon: "🔔", label: "通知" },
  { icon: "⚙️", label: "设置" }
];
const ITEM = 44;
const GAP = 6;
const PAD = 8;
const slotCenter = (i) => PAD + i * (ITEM + GAP) + ITEM / 2;

export default function Dock() {
  const { pushToast } = useApp();
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const ref = useRef(null);
  const mx = useMotionValue(slotCenter(0));
  const sx = useSpring(mx, { stiffness: 320, damping: 30, mass: 0.6 });
  const dropX = useTransform(sx, (v) => v - 17);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set(Math.max(0, Math.min(r.width, e.clientX - r.left)));
    if (!hovering) setHovering(true);
  };
  const onLeave = () => setHovering(false);

  return (
    <nav ref={ref} className="dock lg" aria-label="快捷导航" onPointerMove={onMove} onPointerLeave={onLeave}>
      <svg className="lg-defs" aria-hidden="true" focusable="false">
        <defs>
          <filter id="dock-goo" x="-30%" y="-60%" width="160%" height="220%" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix in="blur" mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8" result="goo" />
            <feGaussianBlur in="goo" stdDeviation="0.6" />
          </filter>
        </defs>
      </svg>

      <div className="dock__goo" aria-hidden="true">
        {ITEMS.map((it, i) => (
          <span key={i} className="dock__drop" style={{ left: slotCenter(i) - 7 }} />
        ))}
        <motion.span className="dock__active" initial={{ x: slotCenter(0) - 15 }} animate={{ x: slotCenter(active) - 15 }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }} />
        <motion.span className={"dock__droplet" + (hovering ? " is-on" : "")} style={{ x: dropX }} />
      </div>

      {ITEMS.map((it, i) => (
        <button key={i} className="dock__item" aria-current={active === i ? "true" : undefined} aria-label={it.label}
          onClick={() => { setActive(i); if (i === 2) pushToast("info", "新通知", "你有 3 条未读消息。"); }}>
          {it.icon}
        </button>
      ))}
    </nav>
  );
}
