function Moon() {
  return (
    <div className="moon">
      <div className="moon-color"></div>
      <div className="moon-mask"></div>
    </div>
  );
}

function ClearNight() {
  return (
    <div className="icon-container clear-night">
      <Moon />
    </div>
  );
}

export default ClearNight;
