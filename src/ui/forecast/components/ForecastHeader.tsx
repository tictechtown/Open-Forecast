type Props = {
  displayName: string;
  onClick: () => void;
};

function ForecastHeader({ displayName, onClick }: Props) {
  return (
    <div role="button" tabIndex={0} className="header" onClick={onClick}>
      <h2>{displayName}</h2>
    </div>
  );
}

export default ForecastHeader;
