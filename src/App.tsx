import { Route, HashRouter } from "@solidjs/router";
import { lazy } from "solid-js";
import "./styles/main.css";

// Lazy load components with prefetch
const Home = lazy(() => import("./pages/Home"));
const PortfolioPage = lazy(() => import("./pages/PortfolioPage"));
const NewFormPage = lazy(() => import("./pages/NewFormPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

// Prefetch other routes when idle
if ('requestIdleCallback' in window) {
  requestIdleCallback(() => {
    import("./pages/PortfolioPage");
    import("./pages/NewFormPage");
  });
}

const App = () => {
  return (
    <HashRouter>
      <Route path="/" component={Home} />
      <Route path="/portfolio" component={PortfolioPage} />
      <Route path="/resume-generator" component={NewFormPage} />
      <Route path="*" component={NotFoundPage} />
    </HashRouter>
  );
};

export default App;
