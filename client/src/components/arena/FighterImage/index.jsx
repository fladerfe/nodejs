export default function FighterImage({fighter}) {
  const {image, name} = fighter;
  
  return (
    <img
      className="fighter-preview___img"
      src={image}
      alt={name}
      title={name}
    />
  )
};
