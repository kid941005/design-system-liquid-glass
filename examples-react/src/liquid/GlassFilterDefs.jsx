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
          <feDisplacementMap ref={dispRef} in="SourceGraphic" in2="noise" scale="22" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}
