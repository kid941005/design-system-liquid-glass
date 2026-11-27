import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LiquidGlass from "../liquid/LiquidGlass.jsx";
import { useApp } from "../state/app-state.jsx";

const LINKS = [["功能", "#features"], ["工作方式", "#workflow"], ["定价", "#pricing"], ["资源", "#faq"]];

export default function Nav() {
  const { state, dispatch, toggleTheme, toggleQuality } = useApp();
  const [open, setOpen] = useState(false);
  return (
    <>
      <LiquidGlass as="header" className="nav wrap">
        <a className="brand" href="#top">
          <span className="brand__mark">◍</span><span className="brand__name">Aura</span>
        </a>
        <nav className="nav__links">
          {LINKS.map((l) => <a key={l[1]} href={l[1]}>{l[0]}</a>)}
        </nav>
        <div className="nav__actions">
          <button className="btn btn--ghost btn--sm" onClick={toggleTheme} aria-label="切换主题">
            {state.theme === "light" ? "🌙" : "☀️"}
          </button>
          <button className="btn btn--ghost btn--sm nav__quality" onClick={toggleQuality} title="切换液态动效质量">
            {"动效·"}{state.quality === "low" ? "低" : "高"}
          </button>
          <a className="btn btn--glass btn--sm nav__cta" href="#pricing">登录</a>
          <button className="btn btn--primary btn--sm"
            onClick={() => dispatch({ type: "modal", value: true, kind: "signup" })}>免费开始</button>
          <button className="btn btn--ghost btn--sm nav__menu" aria-label="菜单" onClick={() => setOpen((o) => !o)}>☰</button>
        </div>
      </LiquidGlass>
      <AnimatePresence>
        {open ? (
          <motion.div className="mobilemenu" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }} onClick={() => setOpen(false)}>
            {LINKS.map((l) => <a key={l[1]} href={l[1]}>{l[0]}</a>)}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
