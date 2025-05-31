import { Route, HashRouter } from "@solidjs/router";
import Home from "./pages/Home";
import NewFormPage from "./pages/NewFormPage";
import NotFoundPage from "./pages/NotFoundPage";
import "./styles/main.css";

const App = () => {
  return (
    <HashRouter>
      <Route path="/" component={Home} />
      <Route path="/resume-generator" component={NewFormPage} />
      <Route path="*" component={NotFoundPage} />
    </HashRouter>
  );
};

export default App;
