import Cloud from "./Cloud";
import "./Icons.css";

export function RainDrops() {
  return (
    <div className="rain-container">
      <div className="rain-drop-container rain-drop-animated">
        <div className="rain-drop"></div>
      </div>
      <div className="rain-drop-container rain-drop-animated">
        <div className="rain-drop"></div>
      </div>
      <div className="rain-drop-container rain-drop-animated">
        <div className="rain-drop"></div>
      </div>
    </div>
  );
}

function Rain() {
  return (
    <div className="icon-container rain">
      <Cloud />
      <RainDrops />
    </div>
  );
}

export default Rain;
