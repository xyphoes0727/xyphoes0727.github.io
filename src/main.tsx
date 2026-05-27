import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { getRouter } from "./router";
import "./styles.css";

// GitHub Pages 404.html SPA fallback:
// when the 404 page boots, it stashed the original path in sessionStorage.
// Replay it into history so the router picks up the deep link.
const redirectPath = sessionStorage.getItem("gh-pages-redirect");
if (redirectPath) {
  sessionStorage.removeItem("gh-pages-redirect");
  if (redirectPath !== window.location.pathname + window.location.search + window.location.hash) {
    window.history.replaceState(null, "", redirectPath);
  }
}

const router = getRouter();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
