import Cloud from "./Cloud";
import "./Icons.css";
import { RainDrops } from "./Rain";
import Sun from "./Sun";

function Shower() {
  return (
    <div className="icon-container shower">
      <div className="sun-container">
        <Sun />
      </div>
      <Cloud />
      <RainDrops />
    </div>
  );
}

export default Shower;
