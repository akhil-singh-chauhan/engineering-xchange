import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

async function disableStaleMockServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  const registrations = await navigator.serviceWorker.getRegistrations();

  await Promise.all(
    registrations
      .filter((registration) =>
        registration.active?.scriptURL.includes("mockServiceWorker"),
      )
      .map((registration) => registration.unregister()),
  );
}

async function enableMocking() {
  if (import.meta.env.VITE_USE_MSW !== "true") {
    await disableStaleMockServiceWorker();
    return;
  }

  const { worker } = await import("./mocks/browser");

  return worker.start({
    onUnhandledRequest: "bypass",
  });
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
