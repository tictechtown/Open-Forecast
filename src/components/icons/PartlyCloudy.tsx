import Cloud from "./Cloud";
import "./Icons.css";
import Sun from "./Sun";

function PartlyCloudy() {
  return (
    <div className="icon-container partly-cloudy">
      <Sun />
      <Cloud />
    </div>
  );
}

export default PartlyCloudy;
