import { useEffect, useState } from "react";

let cache = null;

function detect() {
  if (cache !== null) return cache;
  try {
    const el = document.createElement("div");
    el.style.backdropFilter = "url(#lg-distort)";
    const ok = el.style.backdropFilter !== "";
    cache = ok;
    return ok;
  } catch (e) {
    cache = false;
    return false;
  }
}

// Detect real support for SVG-filter (displacement) in backdrop-filter.
export function useLiquidSupport() {
  const [ok, setOk] = useState(detect);
  useEffect(() => { setOk(detect()); }, []);
  return ok;
}
