export default function FighterImage({fighter}) {
  const {source, name} = fighter;
  
  return (
    <img
      className="fighter-preview___img"
      src={source}
      alt={name}
      title={name}
    />
  )
};
