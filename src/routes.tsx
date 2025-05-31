import Home from "./pages/Home";
import NotFoundPage from "./pages/NotFoundPage";
import NewFormPage from "./pages/NewFormPage"; // Import the new page
// import { RouterConfig } from "./types"; // Assuming RouterConfig type would be updated from element: JSX.Element to component: Component
import type { Component } from "solid-js";

export interface AppRoute {
    path: string;
    component: Component<any>; // Changed from element: <JSX.Element>
    title: string;
}
export const appRoutes: AppRoute[] = [
    { path: "/", component: Home, title: "Jessen Reinhart - Home Page" },
    { path: "/resume-generator", component: NewFormPage, title: "Generate Your ATS Friendly Resume!" },
    { path: "*", component: NotFoundPage, title: "Page Not Found" }
];
