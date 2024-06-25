type Props = {
  animated?: boolean;
};
function Cloud({ animated = false }: Props) {
  return <div className={`cloud ${animated ? "animated" : ""}`} />;
}

export default Cloud;
