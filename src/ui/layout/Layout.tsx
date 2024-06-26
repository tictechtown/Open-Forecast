import { ReactNode } from "react";
import { CityData } from "../../types";
import "./Layout.css";
import NavBar from "./NavBar";

type Props = {
  sideContent: CityData[];
  selectedId: CityData["id"] | null;
  onSelect: (value: CityData["id"]) => void;
  onSearchSelect: (value: CityData) => void;
} & { children?: ReactNode };

function Layout({
  children,
  sideContent,
  selectedId,
  onSelect,
  onSearchSelect,
}: Props) {
  return (
    <div className="layout">
      <nav id="nav-bar">
        <NavBar
          sideContent={sideContent}
          selectedId={selectedId}
          onSelect={onSelect}
          onSearchSelect={onSearchSelect}
        />
      </nav>
      <main>{children}</main>
    </div>
  );
}

export default Layout;
