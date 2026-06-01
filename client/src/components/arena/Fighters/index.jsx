import FighterImage from "../FighterImage";

export default function Fighters({firstFighter, secondFighter}) {
  const firstFighterElement = createFighter(firstFighter, 'left');
  const secondFighterElement = createFighter(secondFighter, 'right');

  return (
    <div className="arena___battlefield">
      {firstFighterElement}
      {secondFighterElement}
    </div>
  )
}

function createFighter(fighter, position) {
  const positionClassName = position === 'right' ? 'arena___right-fighter' : 'arena___left-fighter';
  const className =  `arena___fighter ${positionClassName}`

  return (
    <div className={className}>
      <FighterImage fighter={fighter}/>
    </div>
  )
}