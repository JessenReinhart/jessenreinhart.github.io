import "./styles/main.css";
import Layout from "./layout/Layout";
import { useLocation } from "@solidjs/router";
import { appRoutes } from "./routes";
import { createEffect, Show } from "solid-js";

const App = () => {
  const location = useLocation();

  createEffect(() => {
    const currentPath = location.pathname;
    let newTitle = "Jessen Reinhart - Frontend Engineer"; // Default title

    const matchedRoute = appRoutes.find(route => {
      // Exact match for defined paths
      if (route.path === currentPath) return true;
      // Basic support for parameterized routes (if any added later)
      // This is a simplified matcher; for complex scenarios, a more robust solution might be needed.
      if (route.path.includes(":")) {
        const pattern = new RegExp("^" + route.path.replace(/:\w+/g, "([^/]+)") + "$", "i");
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

  // Find the matching route
  const currentRoute = () => {
    const currentPath = location.pathname;
    return (
      appRoutes.find(route => {
        // Exact match for defined paths
        if (route.path === currentPath) return true;
        // Basic support for parameterized routes (if any added later)
        // This is a simplified matcher; for complex scenarios, a more robust solution might be needed.
        if (route.path.includes(":")) {
          const pattern = new RegExp("^" + route.path.replace(/:\w+/g, "([^/]+)") + "$", "i");
          return pattern.test(currentPath);
        }
        return false;
      }) || appRoutes.find(r => r.path === "*")
    );
  };

  return (
    <Layout>
      <Show when={currentRoute()} keyed>
        {route => {
          const Component = route.component;
          return <Component />;
        }}
      </Show>
    </Layout>
  );
};

export default App;
