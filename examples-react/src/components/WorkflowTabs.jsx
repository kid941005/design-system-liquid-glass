import { AnimatePresence, motion } from "framer-motion";
import { useApp } from "../state/app-state.jsx";

const TABS = [
  { short: "连接数据", title: "连接你的数据源", body: "几十个原生连接器，扫码即连；无需写一行 ETL 代码。" },
  { short: "描述目标", title: "用一句话描述目标", body: "把上周注册但未激活的用户找出来并发送提醒——Aura 自动理解并拆解。" },
  { short: "自动执行", title: "坐等结果", body: "任务在后台运行，进度以玻璃通知实时推送，完成即刻可用。" }
];

export default function WorkflowTabs() {
  const { state, dispatch } = useApp();
  const i = state.tab;
  return (
    <section className="section wrap" id="workflow">
      <div className="section__head">
        <span className="pill">工作方式</span>
        <h2>三步开始，像调节亮度一样简单</h2>
      </div>
      <div className="workflow">
        <div className="segx tabsx" role="tablist" aria-label="工作方式">
          {TABS.map((x, k) => (
            <button key={k} type="button" role="tab" aria-selected={k === i}
              className={"segx__item" + (k === i ? " is-on" : "")} onClick={() => dispatch({ type: "tab", value: k })}>
              {k === i ? (
                <motion.span layoutId="tab-pill" className="segx__pill"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }} />
              ) : null}
              <span className="segx__label">{x.short}</span>
            </button>
          ))}
        </div>
        <div className="panelwrap">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={i} className="panel"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}>
              <h3>{TABS[i].title}</h3>
              <p>{TABS[i].body}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
