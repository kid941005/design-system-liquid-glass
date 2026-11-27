import { createContext, useContext, useReducer, useCallback, useEffect, useRef } from "react";

const AppCtx = createContext(null);
let toastSeq = 0;

const initialState = {
  theme: "light",
  tab: 0,
  billing: "m",
  priority: false,
  modal: false,
  modalKind: "demo",
  toasts: [],
  quality: "auto"
};

function reducer(state, action) {
  switch (action.type) {
    case "theme":
      return { ...state, theme: action.value || (state.theme === "light" ? "dark" : "light") };
    case "tab":
      return { ...state, tab: action.value };
    case "billing":
      return { ...state, billing: action.value };
    case "priority":
      return { ...state, priority: !state.priority };
    case "modal":
      return { ...state, modal: action.value, modalKind: action.kind || state.modalKind };
    case "toast:add":
      return { ...state, toasts: state.toasts.concat(action.toast) };
    case "toast:remove":
      return { ...state, toasts: state.toasts.filter((t) => t.id !== action.id) };
    case "quality":
      return { ...state, quality: action.value };
    default:
      return state;
  }
}

function pickQuality() {
  if (typeof window === "undefined") return "high";
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cores = navigator.hardwareConcurrency || 8;
  const mem = navigator.deviceMemory || 8;
  if (reduce || cores <= 4 || mem <= 4) return "low";
  return "high";
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState, (s) => ({ ...s, quality: pickQuality() }));
  const timers = useRef({});

  const pushToast = useCallback((type, title, message, duration) => {
    const id = ++toastSeq;
    const ms = duration || 3200;
    dispatch({ type: "toast:add", toast: { id, type: type || "info", title, message, duration: ms } });
    timers.current[id] = setTimeout(() => {
      dispatch({ type: "toast:remove", id });
      delete timers.current[id];
    }, ms);
  }, []);

  useEffect(() => {
    const t = timers.current;
    return () => Object.keys(t).forEach((k) => clearTimeout(t[k]));
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", state.theme);
    root.classList.toggle("dark", state.theme === "dark");
  }, [state.theme]);

  const api = {
    state,
    dispatch,
    pushToast,
    toggleTheme: () => dispatch({ type: "theme" }),
    toggleQuality: () => dispatch({ type: "quality", value: state.quality === "high" ? "low" : "high" })
  };
  return <AppCtx.Provider value={api}>{children}</AppCtx.Provider>;
}

export function useApp() {
  const v = useContext(AppCtx);
  if (!v) throw new Error("useApp must be used inside AppProvider");
  return v;
}
