import Cloud from "./Cloud";
import "./Icons.css";
import Sun from "./Sun";

function MostlyCloudy() {
  return (
    <div className="icon-container mostly-cloudy">
      <div className="sun-container">
        <Sun />
      </div>
      <Cloud />
    </div>
  );
}

export default MostlyCloudy;
