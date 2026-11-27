import { motion } from "framer-motion";

export default function Segmented({ items, value, onChange, layoutId, className }) {
  return (
    <div className={"segx" + (className ? " " + className : "")} role="tablist">
      {items.map((it) => {
        const active = it.value === value;
        return (
          <button key={it.value} type="button" role="tab" aria-selected={active}
            className={"segx__item" + (active ? " is-on" : "")} onClick={() => onChange(it.value)}>
            {active ? (
              <motion.span layoutId={layoutId} className="segx__pill"
                transition={{ type: "spring", stiffness: 420, damping: 34 }} />
            ) : null}
            <span className="segx__label">{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}
