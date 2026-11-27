import { AnimatePresence, motion } from "framer-motion";
import { useApp } from "../state/app-state.jsx";

const ICONS = { info: "i", success: "✓", warning: "!", error: "✕" };

export default function Toasts() {
  const { state } = useApp();
  return (
    <div className="toast-region" aria-live="polite">
      <AnimatePresence initial={false}>
        {state.toasts.map((t) => (
          <motion.div key={t.id} layout className={"toast toast--" + (t.type || "info")}
            initial={{ opacity: 0, y: 20, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 32, scale: 0.96 }} transition={{ type: "spring", stiffness: 380, damping: 30 }}>
            <span className="toast__icon" aria-hidden="true">{ICONS[t.type] || "i"}</span>
            <div style={{ display: "grid", gap: "2px" }}>
              {t.title ? <span className="toast__title">{t.title}</span> : null}
              {t.message ? <span className="toast__msg">{t.message}</span> : null}
            </div>
            <span className="toast__bar" style={{ animationDuration: t.duration + "ms" }} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
