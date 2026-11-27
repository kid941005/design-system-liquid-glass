import { AppProvider } from "./state/app-state.jsx";
import GlassFilterDefs from "./liquid/GlassFilterDefs.jsx";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import RefractionDemo from "./components/RefractionDemo.jsx";
import Features from "./components/Features.jsx";
import WorkflowTabs from "./components/WorkflowTabs.jsx";
import Pricing from "./components/Pricing.jsx";
import CTA from "./components/CTA.jsx";
import Footer from "./components/Footer.jsx";
import Dock from "./components/Dock.jsx";
import Modal from "./components/Modal.jsx";
import Toasts from "./components/Toasts.jsx";

function Logos() {
  return (
    <section className="logos wrap" aria-label="客户">
      <span>已被 4,000+ 团队使用</span>
      <div className="logos__row">
        <b>Northwind</b><b>Orbit</b><b>Lumen</b><b>Kinetic</b><b>Halcyon</b>
      </div>
    </section>
  );
}

function Layout() {
  return (
    <>
      <GlassFilterDefs />
      <Nav />
      <main>
        <Hero />
        <Logos />
        <RefractionDemo />
        <Features />
        <WorkflowTabs />
        <Pricing />
        <CTA />
      </main>
      <Footer />
      <Dock />
      <Modal />
      <Toasts />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Layout />
    </AppProvider>
  );
}
