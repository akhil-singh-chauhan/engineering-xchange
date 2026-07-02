import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

async function enableMocking() {
  // Check the environment variable set by your package.json script
  // if (import.meta.env.VITE_USE_MSW !== "true") {
  //   return;
  // }
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const { worker } = await import("./mocks/browser");

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
  // return worker.start({
  //   onUnhandledRequest: "bypass", // Lets unmocked routes hit the real backend
  // });
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
