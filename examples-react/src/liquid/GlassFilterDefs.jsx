import { useEffect, useRef } from "react";
import { useApp } from "../state/app-state.jsx";

export default function GlassFilterDefs() {
  const turbRef = useRef(null);
  const dispRef = useRef(null);
  const { state } = useApp();
  const animated = state.quality !== "low";

  useEffect(() => {
    if (!animated) return;
    let raf = 0;
    let last = 0;
    const loop = (t) => {
      if (t - last > 90) {
        last = t;
        const turb = turbRef.current;
        const disp = dispRef.current;
        if (turb) {
          const f = 0.010 + Math.sin(t / 2600) * 0.0025;
          const g = 0.014 + Math.cos(t / 3100) * 0.0030;
          turb.setAttribute("baseFrequency", f.toFixed(4) + " " + g.toFixed(4));
        }
        if (disp) {
          const s = 21 + Math.sin(t / 1400) * 5;
          disp.setAttribute("scale", s.toFixed(1));
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [animated]);

  return (
    <svg className="lg-defs" width="0" height="0" aria-hidden="true" focusable="false">
      <defs>
        <filter id="lg-distort" x="-25%" y="-25%" width="150%" height="150%" colorInterpolationFilters="sRGB">
          <feTurbulence ref={turbRef} type="fractalNoise" baseFrequency="0.010 0.014" numOctaves="2" seed="9" result="turb" />
          <feGaussianBlur in="turb" stdDeviation="2.4" result="noise" />
          <feDisplacementMap ref={dispRef} in="SourceGraphic" in2="noise" scale="22" xChannelSelector="R" yChannelSelector="G" result="disp" />
          <feColorMatrix in="disp" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r" />
          <feOffset in="r" dx="1.2" dy="0" result="r2" />
          <feColorMatrix in="disp" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="g" />
          <feColorMatrix in="disp" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="b" />
          <feOffset in="b" dx="-1.2" dy="0" result="b2" />
          <feBlend in="r2" in2="g" mode="screen" result="rg" />
          <feBlend in="rg" in2="b2" mode="screen" />
        </filter>
        <filter id="lg-distort-soft" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.014 0.018" numOctaves="2" seed="5" result="turb" />
          <feGaussianBlur in="turb" stdDeviation="1.4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}
