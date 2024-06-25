import { useState } from "react";
import { createPortal } from "react-dom";
import { CityData } from "../../types";
import SearchBox from "./SearchBox";

type Props = {
  onSelect: (value: CityData) => void;
};

function SearchModal({ onSelect }: Props) {
  const [key, setKey] = useState(false);

  const closeModal = (e: React.MouseEvent) => {
    if (e.target !== e.currentTarget) return;
    (document.querySelector("#search-modal") as HTMLDialogElement).close();
    setKey((v) => !v);
  };

  const _onSelect = (e: CityData) => {
    onSelect(e);
    (document.querySelector("#search-modal") as HTMLDialogElement).close();
    setKey((v) => !v);
  };

  return createPortal(
    <dialog id="search-modal" className="modal" onClick={closeModal}>
      <article key={key ? "true" : "false"}>
        <SearchBox onSelect={_onSelect} large />
      </article>
    </dialog>,
    document.body,
  );
}

export default SearchModal;
