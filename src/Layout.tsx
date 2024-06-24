import AutoComplete from "./AutoComplete";
import "./Layout.css";
import { CityData } from "./types";

type Props = {
  sideContent: CityData[];
  selectedId: CityData["id"] | null;
  onSelect: (value: CityData["id"]) => void;
};

function Layout(props: Props) {
  const { children, sideContent, selectedId, onSelect } = props;

  const startSearch = () => {
    document.querySelector("#search-modal").showModal();
  };

  const hideLocation = () => {
    document.querySelector("#nav-bar")?.classList.remove("active");
  };

  const onAdd = () => {};

  return (
    <div>
      <nav id="nav-bar">
        <div className="search-box-small">
          <AutoComplete onSelect={onAdd} />
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
