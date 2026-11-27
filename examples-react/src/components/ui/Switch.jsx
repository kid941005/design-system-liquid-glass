import { motion } from "framer-motion";

export default function Switch({ checked, onChange, label }) {
  return (
    <button type="button" role="switch" aria-checked={checked} aria-label={label}
      className={"swx" + (checked ? " is-on" : "")} onClick={onChange}>
      <motion.span className="swx__thumb" animate={{ x: checked ? 20 : 0 }}
        transition={{ type: "spring", stiffness: 520, damping: 32 }} />
    </button>
  );
}
