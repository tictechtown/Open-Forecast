import { useState } from "react";
import { createPortal } from "react-dom";
import AutoComplete from "./AutoComplete";

function AutocompleteModal({ onSelect }) {
  const [key, setKey] = useState(false);

  const closeModal = (e) => {
    if (e.target !== e.currentTarget) return;
    document.querySelector("#search-modal")?.close();
    setKey((v) => !v);
  };

  const _onSelect = (e) => {
    onSelect(e);
    document.querySelector("#search-modal")?.close();
    setKey((v) => !v);
  };

  return createPortal(
    <dialog id="search-modal" className="modal" onClick={closeModal}>
      <article key={key ? "true" : "false"}>
        <AutoComplete onSelect={_onSelect} />
      </article>
    </dialog>,
    document.body,
  );
}

export default AutocompleteModal;
