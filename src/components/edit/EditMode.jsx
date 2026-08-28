import { useCallback, useEffect, useRef, useState } from "react";
import {
  decodeMarker,
  originalOf,
  recordAt,
  resetText,
  saveText,
  stripMarkers,
  verifyKey,
} from "../../lib/copy";
import { describe } from "../../lib/copyRegistry";
import "./EditMode.css";

const KEY_STORE = "eba.editKey";
const MARKER_LENGTH = 18; // start + sixteen bits + end

/* The editor's own chrome must never become editable itself. */
const isOwnUi = (el) => Boolean(el?.closest?.(".ebaedit"));

/**
 * Finds the piece of text under the pointer.
 *
 * Every string on the page carries an invisible marker naming its place in the
 * registry, so this is a matter of reading that marker off the text node the
 * pointer is over. The walk upwards covers pointers that land on an element
 * padding rather than on the words themselves.
 */
function findTarget(start) {
  let el = start;
  for (let hop = 0; el && el.nodeType === 1 && hop < 4; hop += 1) {
    if (isOwnUi(el)) return null;
    for (const node of el.childNodes) {
      if (node.nodeType !== 3) continue;
      const index = decodeMarker(node.data);
      if (index >= 0) return { node, el, index };
    }
    el = el.parentElement;
  }
  return null;
}

/**
 * Rewrites every place on the page that renders this same string.
 *
 * Saving already writes the new wording into the data the components read
 * from, so this is only about the nodes React has on screen right now. Editing
 * them in place avoids remounting the app, which would restart the animations.
 */
function repaint(index, value) {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const hits = [];
  while (walker.nextNode()) {
    if (decodeMarker(walker.currentNode.data) === index) hits.push(walker.currentNode);
  }
  hits.forEach((node) => {
    const marker = node.data.slice(-MARKER_LENGTH);
    node.data = value + marker;
  });
}

/* --------------------------------------------------------- password ----- */

function Gate({ onUnlock }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await verifyKey(value);
      sessionStorage.setItem(KEY_STORE, value);
      onUnlock(value);
    } catch (err) {
      setError(err.message || "Parola nu este corecta.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="ebaedit ebaedit__gate">
      <form className="ebaedit__gatebox" onSubmit={submit}>
        <p className="ebaedit__gatetitle">Editare site</p>
        <p className="ebaedit__gatenote">
          Introdu parola ca sa poti schimba textul direct pe pagina.
        </p>
        <input
          type="password"
          className="ebaedit__input"
          value={value}
          autoFocus
          onChange={(e) => setValue(e.target.value)}
          placeholder="Parola"
        />
        {error && <p className="ebaedit__error">{error}</p>}
        <div className="ebaedit__gaterow">
          <a className="ebaedit__ghost" href={window.location.pathname}>
            Renunt
          </a>
          <button className="ebaedit__btn" type="submit" disabled={busy || !value}>
            {busy ? "Verific..." : "Intru"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* ------------------------------------------------------------ editor ---- */

export default function EditMode() {
  const [editKey, setEditKey] = useState(() => sessionStorage.getItem(KEY_STORE) || "");
  const [hover, setHover] = useState(null);
  const [target, setTarget] = useState(null);
  const [draft, setDraft] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const areaRef = useRef(null);

  const open = useCallback((found) => {
    const record = recordAt(found.index);
    if (!record) return;
    const current = stripMarkers(found.node.data);
    setTarget({
      index: found.index,
      key: record.key,
      label: describe(record.key),
      original: record.original,
      current,
    });
    setDraft(current);
    setStatus("");
  }, []);

  /* Hover outline and click-to-select, both on the capture phase so that a
     link under the pointer opens the editor instead of navigating away. */
  useEffect(() => {
    if (!editKey) return undefined;

    function onMove(e) {
      const found = findTarget(e.target);
      if (!found) {
        setHover(null);
        return;
      }
      const r = found.el.getBoundingClientRect();
      setHover({ top: r.top, left: r.left, width: r.width, height: r.height });
    }

    function onClick(e) {
      if (isOwnUi(e.target)) return;
      const found = findTarget(e.target);
      if (!found) return;
      e.preventDefault();
      e.stopPropagation();
      open(found);
    }

    function onKey(e) {
      if (e.key === "Escape") setTarget(null);
    }

    document.addEventListener("mousemove", onMove, true);
    document.addEventListener("click", onClick, true);
    document.addEventListener("keydown", onKey);
    document.body.classList.add("ebaedit-on");
    return () => {
      document.removeEventListener("mousemove", onMove, true);
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("ebaedit-on");
    };
  }, [editKey, open]);

  useEffect(() => {
    if (target && areaRef.current) areaRef.current.focus();
  }, [target]);

  const save = useCallback(async () => {
    if (!target) return;
    setBusy(true);
    setStatus("");
    try {
      await saveText(target.key, draft, editKey);
      repaint(target.index, draft);
      setStatus("Salvat.");
      setTarget((t) => ({ ...t, current: draft }));
    } catch (err) {
      setStatus(err.message || "Nu s-a putut salva.");
    } finally {
      setBusy(false);
    }
  }, [draft, editKey, target]);

  const revert = useCallback(async () => {
    if (!target) return;
    setBusy(true);
    setStatus("");
    try {
      await resetText(target.key, editKey);
      repaint(target.index, target.original);
      setDraft(target.original);
      setStatus("Am pus textul original la loc.");
      setTarget((t) => ({ ...t, current: t.original }));
    } catch (err) {
      setStatus(err.message || "Nu s-a putut reveni.");
    } finally {
      setBusy(false);
    }
  }, [editKey, target]);

  if (!editKey) return <Gate onUnlock={setEditKey} />;

  const dirty = target ? draft !== target.current : false;
  const changed = target ? target.current !== target.original : false;

  return (
    <>
      {hover && !target && (
        <div
          className="ebaedit ebaedit__hl"
          style={{
            top: `${hover.top}px`,
            left: `${hover.left}px`,
            width: `${hover.width}px`,
            height: `${hover.height}px`,
          }}
        />
      )}

      <div className="ebaedit ebaedit__bar">
        <span className="ebaedit__dot" />
        <span className="ebaedit__barlabel">Mod editare</span>
        <span className="ebaedit__hint">Click pe orice text de pe pagina</span>
        <a className="ebaedit__ghost" href={window.location.pathname}>
          Ies
        </a>
      </div>

      {target && (
        <aside className="ebaedit ebaedit__panel" aria-label="Editare text">
          <p className="ebaedit__path">{target.label}</p>

          <textarea
            ref={areaRef}
            className="ebaedit__area"
            value={draft}
            rows={Math.min(14, Math.max(3, Math.ceil(draft.length / 42)))}
            onChange={(e) => setDraft(e.target.value)}
          />

          {changed && (
            <p className="ebaedit__orig">
              <span>Textul original:</span> {target.original}
            </p>
          )}

          {status && <p className="ebaedit__status">{status}</p>}

          <div className="ebaedit__row">
            <button className="ebaedit__btn" onClick={save} disabled={busy || !dirty}>
              {busy ? "Salvez..." : "Salvez"}
            </button>
            <button className="ebaedit__ghost" onClick={revert} disabled={busy || !changed}>
              Original
            </button>
            <button className="ebaedit__ghost" onClick={() => setTarget(null)}>
              Inchid
            </button>
          </div>
        </aside>
      )}
    </>
  );
}
