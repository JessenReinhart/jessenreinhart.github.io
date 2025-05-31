import "./styles/main.css";
import Layout from "./layout/Layout";
import { Routes, Route, useLocation } from "@solidjs/router";
import { appRoutes } from "./routes";
import { createEffect, For } from "solid-js";

const App = () => {
  const location = useLocation();

  createEffect(() => {
    const currentPath = location.pathname;
    let newTitle = "Jessen Reinhart"; // Default title

    const matchedRoute = appRoutes.find(route => {
      // Exact match for defined paths
      if (route.path === currentPath) return true;
      // Basic support for parameterized routes (if any added later)
      // This is a simplified matcher; for complex scenarios, a more robust solution might be needed.
      if (route.path.includes(":")) {
        const pattern = new RegExp("^" + route.path.replace(/:\w+/g, "([^/]+)") + "$");
        return pattern.test(currentPath);
      }
      return false;
    });

    if (matchedRoute) {
      newTitle = matchedRoute.title;
    } else {
      // Fallback to wildcard route if no other match
      const wildcardRoute = appRoutes.find(r => r.path === "*");
      if (wildcardRoute) {
        newTitle = wildcardRoute.title;
      }
    }
    document.title = newTitle;
  });

  return (
    <Layout>
      <Routes>
        <For each={appRoutes}>
          {route => (
            <Route path={route.path} component={route.component} />
          )}
        </For>
      </Routes>
    </Layout>
  );
};

export default App;
