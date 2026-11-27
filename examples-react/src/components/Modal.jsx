import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LiquidGlass from "../liquid/LiquidGlass.jsx";
import { useApp } from "../state/app-state.jsx";

export default function Modal() {
  const { state, dispatch, pushToast } = useApp();
  const close = () => dispatch({ type: "modal", value: false });

  useEffect(() => {
    if (!state.modal) return;
    const onKey = (e) => { if (e.key === "Escape") dispatch({ type: "modal", value: false }); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [state.modal, dispatch]);

  return (
    <AnimatePresence>
      {state.modal ? (
        <motion.div className="overlay is-open" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
          <motion.div className="modalwrap" initial={{ opacity: 0, scale: 0.94, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }} transition={{ type: "spring", stiffness: 260, damping: 26 }}>
            <LiquidGlass className="modal" radius="28px">
              <button className="modal__close" onClick={close} aria-label="关闭">×</button>
              <h2 className="modal__title">{state.modalKind === "signup" ? "创建账户" : "预约演示"}</h2>
              <p className="modal__desc">留下工作邮箱，我们会在 1 个工作日内联系你。</p>
              <div className="modal__body">
                <div className="field">
                  <label className="field__label" htmlFor="em">工作邮箱</label>
                  <div className="field__control">
                    <input id="em" className="field__input" type="email" placeholder="you@company.com" />
                  </div>
                </div>
              </div>
              <div className="modal__footer">
                <button className="btn btn--ghost" onClick={close}>取消</button>
                <motion.button className="btn btn--primary" whileTap={{ scale: 0.96 }}
                  onClick={() => { close(); pushToast("success", "已提交", "我们会在 1 个工作日内联系你。"); }}>提交</motion.button>
              </div>
            </LiquidGlass>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
