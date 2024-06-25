import Cloud from "./Cloud";
import "./Icons.css";
import RainDrops from "./RainDrops";

function Rain() {
  return (
    <div className="icon-container rain">
      <Cloud />
      <RainDrops />
    </div>
  );
}

export default Rain;
