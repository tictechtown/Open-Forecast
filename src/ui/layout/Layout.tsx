import { ReactNode } from "react";
import { CityData } from "../../types";
import SearchBox from "../search/SearchBox";
import "./Layout.css";

type Props = {
  sideContent: CityData[];
  selectedId: CityData["id"] | null;
  onSelect: (value: CityData["id"]) => void;
} & { children?: ReactNode };

function Layout(props: Props) {
  const { children, sideContent, selectedId, onSelect } = props;

  const startSearch = () => {
    (document.querySelector("#search-modal") as HTMLDialogElement)?.showModal();
  };

  const hideLocation = () => {
    document.querySelector("#nav-bar")?.classList.remove("active");
  };

  const onAdd = () => {};

  return (
    <div>
      <nav id="nav-bar">
        <div className="search-box-small">
          <SearchBox onSelect={onAdd} />
          <button onClick={hideLocation}></button>
        </div>
        <div className="search-box-large">
          <button onClick={startSearch}>Add Location</button>
        </div>
        <br />
        Saved Locations
        <br />
        <div className="button">Current Location</div>
        {sideContent.map((s) => {
          const selected = s.id === selectedId ? "selected" : "";
          return (
            <div
              key={s.id}
              className={`button ${selected}`}
              onClick={() => {
                onSelect(s.id);
                hideLocation();
              }}
            >
              {`${s.name}, ${s.stateCode}`}
            </div>
          );
        })}
      </nav>
      <main>{children}</main>
    </div>
  );
}

export default Layout;
