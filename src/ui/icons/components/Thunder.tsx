import Cloud from "./Cloud";
import "./Icons.css";
import { RainDrops } from "./Rain";

function Lightning() {
  return <div className="lightning"></div>;
}

function Thunder() {
  return (
    <div className="icon-container thunder">
      <Cloud />
      <RainDrops />
      <Lightning />
    </div>
  );
}

export default Thunder;
