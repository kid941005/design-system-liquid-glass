/* ============================================================
   Liquid Glass Design System — React 组件库 (ui.tsx)
   依赖 assets/tokens.css 与 assets/components.css
   适用于 React 18+；Next.js App Router 已含 "use client"
   ============================================================ */
"use client";

import React from "react";
import ReactDOM from "react-dom";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/* ---------------- Glass 容器 ---------------- */
export type GlassProps = React.HTMLAttributes<HTMLDivElement> & {
  intensity?: "regular" | "strong";
  /** 真折射（需页面根节点渲染一次 <GlassDefs/>） */
  refract?: boolean;
  /** 可交互：hover 抬升 + 指针高光 */
  interactive?: boolean;
};
export function Glass({ intensity = "regular", refract = false, interactive = false, className, ...rest }: GlassProps) {
  return <div className={cx("glass", intensity === "strong" && "glass--strong",
    refract && "glass--refract", interactive && "glass--interactive", className)} {...rest} />;
}

/** 在应用根节点渲染一次，提供 #lg-distort 真折射滤镜 */
export function GlassDefs() {
  return (
    <svg className="lg-defs" aria-hidden="true" focusable="false">
      <defs>
        <filter id="lg-distort" x="-25%" y="-25%" width="150%" height="150%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.009 0.013" numOctaves="2" seed="7" result="turb" />
          <feGaussianBlur in="turb" stdDeviation="2.2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="26" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}

/* ---------------- Button ---------------- */
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "glass" | "primary" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
};
export function Button({ variant = "glass", size = "md", loading = false, className, children, disabled, ...rest }: ButtonProps) {
  return (
    <button className={cx("btn", `btn--${variant}`, `btn--${size}`, className)}
      disabled={disabled || loading} aria-busy={loading} {...rest}>
      {loading && <span className="btn__spinner" aria-hidden />}
      <span className="btn__label">{children}</span>
    </button>
  );
}

/* ---------------- Input / Textarea ---------------- */
export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> & {
  label?: string; hint?: string; error?: string;
  prefix?: React.ReactNode; suffix?: React.ReactNode;
  allowClear?: boolean; onValueChange?: (v: string) => void;
};
export function Input({ label, hint, error, prefix, suffix, allowClear, value, defaultValue = "", onValueChange, id, type = "text", className, ...rest }: InputProps) {
  const inputId = id ?? React.useId();
  const [internal, setInternal] = React.useState(String(defaultValue));
  const controlled = value !== undefined;
  const val = controlled ? String(value) : internal;
  const [show, setShow] = React.useState(false);
  const isPassword = type === "password";
  const update = (v: string) => { if (!controlled) setInternal(v); onValueChange?.(v); };
  return (
    <div className={cx("field", error && "field--invalid", className)}>
      {label && <label className="field__label" htmlFor={inputId}>{label}</label>}
      <div className="field__control">
        {prefix && <span className="field__addon" aria-hidden>{prefix}</span>}
        <input id={inputId} className="field__input" type={isPassword && show ? "text" : type}
          value={val} aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-msg` : undefined}
          onChange={(e) => update(e.target.value)} {...rest} />
        {allowClear && val && (
          <button type="button" className="field__clear" aria-label="清除" onClick={() => update("")}>×</button>
        )}
        {isPassword && (
          <button type="button" className="field__reveal" aria-pressed={show}
            aria-label={show ? "隐藏密码" : "显示密码"} onClick={() => setShow((s) => !s)}>
            {show ? "🙈" : "👁"}
          </button>
        )}
        {suffix && <span className="field__addon">{suffix}</span>}
      </div>
      {(error || hint) && (
        <span id={`${inputId}-msg`} className={cx("field__hint", error && "field__hint--error")}>{error || hint}</span>
      )}
    </div>
  );
}

export type TextareaProps = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> & {
  label?: string; hint?: string; error?: string; onValueChange?: (v: string) => void;
};
export function Textarea({ label, hint, error, value, defaultValue = "", onValueChange, id, className, ...rest }: TextareaProps) {
  const areaId = id ?? React.useId();
  const [internal, setInternal] = React.useState(String(defaultValue));
  const controlled = value !== undefined;
  const val = controlled ? String(value) : internal;
  const update = (v: string) => { if (!controlled) setInternal(v); onValueChange?.(v); };
  return (
    <div className={cx("field", "field--textarea", error && "field--invalid", className)}>
      {label && <label className="field__label" htmlFor={areaId}>{label}</label>}
      <div className="field__control">
        <textarea id={areaId} className="field__textarea" value={val}
          aria-invalid={!!error}
          aria-describedby={error ? `${areaId}-msg` : undefined}
          onChange={(e) => update(e.target.value)} {...rest} />
      </div>
      {(error || hint) && (
        <span id={`${areaId}-msg`} className={cx("field__hint", error && "field__hint--error")}>{error || hint}</span>
      )}
    </div>
  );
}

/* ---------------- Card ---------------- */
export type CardProps = React.HTMLAttributes<HTMLDivElement> & { interactive?: boolean };
export function Card({ interactive = false, className, ...rest }: CardProps) {
  return <div className={cx("card", interactive && "card--interactive", className)}
    tabIndex={interactive ? 0 : undefined} role={interactive ? "button" : undefined} {...rest} />;
}

/* ---------------- Switch ---------------- */
export function Switch({ checked, defaultChecked = false, onChange, label, id }: {
  checked?: boolean; defaultChecked?: boolean; onChange?: (v: boolean) => void; label?: string; id?: string;
}) {
  const [internal, setInternal] = React.useState(defaultChecked);
  const on = checked ?? internal;
  const toggle = () => { const next = !on; if (checked === undefined) setInternal(next); onChange?.(next); };
  return (
    <button id={id} type="button" role="switch" aria-checked={on} aria-label={label}
      data-on={on} className="switch" onClick={toggle}>
      <span className="switch__thumb" aria-hidden />
    </button>
  );
}

/* ---------------- SegmentedControl ---------------- */
export function SegmentedControl({ options, value, onChange }: {
  options: { label: string; value: string }[]; value: string; onChange: (v: string) => void;
}) {
  const i = Math.max(0, options.findIndex((o) => o.value === value));
  return (
    <div className="seg" role="tablist" style={{ "--n": options.length, "--i": i } as React.CSSProperties}>
      <span className="seg__indicator" aria-hidden />
      {options.map((o) => (
        <button key={o.value} role="tab" aria-selected={o.value === value}
          className="seg__item" onClick={() => onChange(o.value)}>{o.label}</button>
      ))}
    </div>
  );
}

/* ---------------- Modal（焦点陷阱 + 退场动画） ---------------- */
function usePresence(open: boolean, exitMs = 240) {
  const [mounted, setMounted] = React.useState(open);
  React.useEffect(() => {
    if (open) { setMounted(true); return; }
    const t = setTimeout(() => setMounted(false), exitMs);
    return () => clearTimeout(t);
  }, [open, exitMs]);
  return mounted;
}
const FOCUSABLE = 'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])';
export function Modal({ open, onClose, title, description, children, footer }: {
  open: boolean; onClose: () => void; title?: string; description?: string;
  children?: React.ReactNode; footer?: React.ReactNode;
}) {
  const mounted = usePresence(open);
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!open) return;
    const lastActive = document.activeElement as HTMLElement | null;
    const node = ref.current;
    node?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.stopPropagation(); onClose(); return; }
      if (e.key !== "Tab" || !node) return;
      const f = Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey, true);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey, true);
      document.body.style.overflow = prevOverflow;
      lastActive?.focus();
    };
  }, [open, onClose]);
  if (!mounted) return null;
  return ReactDOM.createPortal(
    <div className={cx("overlay", open && "is-open")}
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div ref={ref} className="modal" role="dialog" aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        aria-describedby={description ? "modal-desc" : undefined}>
        <button type="button" className="modal__close" aria-label="关闭" onClick={onClose}>×</button>
        {title && <h2 id="modal-title" className="modal__title">{title}</h2>}
        {description && <p id="modal-desc" className="modal__desc">{description}</p>}
        <div className="modal__body">{children}</div>
        {footer && <div className="modal__footer">{footer}</div>}
      </div>
    </div>,
    document.body
  );
}

/* ---------------- Toast ---------------- */
export type ToastType = "info" | "success" | "warning" | "error";
export type ToastData = { id: number; type?: ToastType; title?: string; message?: string; duration?: number };
const TOAST_ICON: Record<ToastType, string> = { info: "i", success: "✓", warning: "!", error: "✕" };
const ToastCtx = React.createContext<{ push: (t: Omit<ToastData, "id">) => void } | null>(null);

function ToastItem({ t, onDone }: { t: ToastData; onDone: () => void }) {
  const [leaving, setLeaving] = React.useState(false);
  const duration = t.duration ?? 3200;
  const doneRef = React.useRef(onDone);
  doneRef.current = onDone;
  React.useEffect(() => {
    const hide = setTimeout(() => setLeaving(true), Math.max(0, duration - 180));
    const done = setTimeout(() => doneRef.current(), duration);
    return () => { clearTimeout(hide); clearTimeout(done); };
  }, [duration]);
  const type = t.type ?? "info";
  return (
    <div className={cx("toast", `toast--${type}`, leaving && "toast--leave")} role="status">
      <span className="toast__icon" aria-hidden>{TOAST_ICON[type]}</span>
      <div style={{ display: "grid", gap: 2 }}>
        {t.title && <span className="toast__title">{t.title}</span>}
        {t.message && <span className="toast__msg">{t.message}</span>}
      </div>
      <span className="toast__bar" style={{ animationDuration: `${duration}ms` }} />
    </div>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<ToastData[]>([]);
  const idRef = React.useRef(0);
  const push = React.useCallback((t: Omit<ToastData, "id">) => {
    setItems((prev) => [...prev.slice(-3), { id: ++idRef.current, type: "info", duration: 3200, ...t }]);
  }, []);
  const remove = React.useCallback((id: number) => setItems((prev) => prev.filter((x) => x.id !== id)), []);
  return (
    <ToastCtx.Provider value={{ push }}>
      {children}
      <div className="toast-region" aria-live="polite" aria-atomic="false">
        {items.map((t) => <ToastItem key={t.id} t={t} onDone={() => remove(t.id)} />)}
      </div>
    </ToastCtx.Provider>
  );
}
export function useToast() {
  const ctx = React.useContext(ToastCtx);
  if (!ctx) throw new Error("useToast 必须在 <ToastProvider> 内使用");
  return ctx;
}

/* ---------------- Tabs ---------------- */
export function Tabs({ tabs, value, defaultValue, onChange, children }: {
  tabs: { key: string; label: string }[]; value?: string; defaultValue?: string;
  onChange?: (k: string) => void; children: (active: string) => React.ReactNode;
}) {
  const [internal, setInternal] = React.useState(defaultValue ?? tabs[0]?.key ?? "");
  const active = value ?? internal;
  const listRef = React.useRef<HTMLDivElement>(null);
  const [ind, setInd] = React.useState({ left: 0, width: 0 });
  const measure = React.useCallback(() => {
    const list = listRef.current; if (!list) return;
    const el = list.querySelector<HTMLElement>(`[data-key="${active}"]`);
    if (el) setInd({ left: el.offsetLeft, width: el.offsetWidth });
  }, [active]);
  React.useEffect(() => { measure(); }, [measure]);
  React.useEffect(() => {
    const ro = new ResizeObserver(measure);
    if (listRef.current) ro.observe(listRef.current);
    window.addEventListener("resize", measure);
    return () => { ro.disconnect(); window.removeEventListener("resize", measure); };
  }, [measure]);
  const select = (k: string) => { if (value === undefined) setInternal(k); onChange?.(k); };
  const onKeyDown = (e: React.KeyboardEvent) => {
    const idx = tabs.findIndex((t) => t.key === active);
    if (idx < 0) return;
    let next = idx;
    if (e.key === "ArrowRight") next = (idx + 1) % tabs.length;
    else if (e.key === "ArrowLeft") next = (idx - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    else return;
    e.preventDefault();
    select(tabs[next].key);
    listRef.current?.querySelector<HTMLElement>(`[data-key="${tabs[next].key}"]`)?.focus();
  };
  return (
    <div className="tabs">
      <div ref={listRef} className="tabs__list" role="tablist" aria-label="tabs" onKeyDown={onKeyDown}>
        <span className="tabs__indicator" aria-hidden
          style={{ transform: `translateX(${ind.left}px)`, width: ind.width }} />
        {tabs.map((t) => (
          <button key={t.key} data-key={t.key} role="tab" id={`tab-${t.key}`}
            aria-selected={t.key === active} aria-controls={`panel-${t.key}`}
            tabIndex={t.key === active ? 0 : -1}
            className="tabs__tab" onClick={() => select(t.key)}>{t.label}</button>
        ))}
      </div>
      <div className="tabs__panel" role="tabpanel" id={`panel-${active}`}
        aria-labelledby={`tab-${active}`} tabIndex={0}>
        {children(active)}
      </div>
    </div>
  );
}

/* ---------------- Dock（液态玻璃 + 水滴融合） ---------------- */
const DOCK_ITEM = 44;
const DOCK_GAP = 6;
const DOCK_PAD = 8;
const dockSlot = (i: number) => DOCK_PAD + i * (DOCK_ITEM + DOCK_GAP) + DOCK_ITEM / 2;

export function Dock({ items, current, onSelect }: {
  items: { key: string; icon: React.ReactNode; label: string }[];
  current: string; onSelect: (k: string) => void;
}) {
  const ref = React.useRef<HTMLElement | null>(null);
  const [hovering, setHovering] = React.useState(false);
  const active = Math.max(0, items.findIndex((it) => it.key === current));

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = Math.min(r.width, Math.max(0, e.clientX - r.left));
    el.style.setProperty("--dock-x", `${x - 20}px`);
    setHovering(true);
  };

  return (
    <nav ref={ref} className={cx("dock", "dock--refract", hovering && "is-hovering")}
      aria-label="主导航" onPointerMove={onMove} onPointerLeave={() => setHovering(false)}>
      <svg className="lg-defs" aria-hidden="true" focusable="false">
        <defs>
          <filter id="lg-distort" x="-25%" y="-25%" width="150%" height="150%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.010 0.014" numOctaves="2" seed="9" result="turb" />
            <feGaussianBlur in="turb" stdDeviation="2.4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="22" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="dock-goo" x="-30%" y="-60%" width="160%" height="220%" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix in="blur" mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8" result="goo" />
            <feGaussianBlur in="goo" stdDeviation="0.6" />
          </filter>
        </defs>
      </svg>

      <div className="dock__goo" aria-hidden="true">
        {items.map((it, i) => (
          <span key={it.key} className="dock__drop" style={{ left: dockSlot(i) - 7 }} />
        ))}
        <span className="dock__active"
          style={{ "--dock-active-x": `${dockSlot(active) - 17}px` } as React.CSSProperties} />
        <span className="dock__droplet" />
      </div>

      {items.map((it) => (
        <button key={it.key} className="dock__item" title={it.label} aria-label={it.label}
          aria-current={it.key === current} onClick={() => onSelect(it.key)}>{it.icon}</button>
      ))}
    </nav>
  );
}
