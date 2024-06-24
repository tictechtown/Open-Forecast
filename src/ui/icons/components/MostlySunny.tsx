import Cloud from "./Cloud";
import "./Icons.css";
import Sun from "./Sun";

function MostlySunny() {
  return (
    <div className="icon-container mostly-sunny">
      <Sun />
      <Cloud />
    </div>
  );
}

export default MostlySunny;
