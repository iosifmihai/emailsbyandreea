import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { loadCopy } from "./lib/copy";
import "./styles/global.css";

/* The editor is opened with ?edit=1 and reaches nobody else: its code is a
   separate chunk that a visitor never downloads. */
const editing = new URLSearchParams(window.location.search).has("edit");
const EditMode = editing ? lazy(() => import("./components/edit/EditMode")) : null;

/**
 * Saved text is written into the content modules before the first render, so
 * the page comes up with the edited words already in it rather than swapping
 * them in afterwards. A slow or unreachable CMS is not allowed to hold the
 * site up: loadCopy gives the network a short window and then renders with
 * whatever it has, which is the cached copy or the wording built into the code.
 */
loadCopy({ editing }).finally(() => {
  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      {EditMode && (
        <Suspense fallback={null}>
          <EditMode />
        </Suspense>
      )}
    </StrictMode>,
  );
});
