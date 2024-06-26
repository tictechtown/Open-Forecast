function DetailItem({
  title,
  value,
  unit,
}: {
  title: string;
  value: number | null;
  unit: string;
}) {
  return (
    <div className="detail-item">
      <div className="detail-value">
        {value?.toFixed(0)}
        {unit}
      </div>
      <div className="detail-title">{title}</div>
    </div>
  );
}

export default DetailItem;
