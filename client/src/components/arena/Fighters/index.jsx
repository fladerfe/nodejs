import FighterImage from "../FighterImage";

const messagesTypes = {
  hit: "Hit!",
  block: "Block!",
  critical: "Critical!",
  dodge: "Dodge!",
};


export default function Fighters({firstFighter, secondFighter, combatTexts}) {
  const firstFighterElement = createFighter(firstFighter, combatTexts);
  const secondFighterElement = createFighter(secondFighter, combatTexts);
  
  return (
    <div className="arena___battlefield">
      {firstFighterElement}
      {secondFighterElement}
    </div>
  )
}

function createFighter(fighter, combatTexts) {
  const positionClassName = fighter.position === 'right' ? 'arena___right-fighter' : 'arena___left-fighter';
  const className =  `arena___fighter ${positionClassName}`
  
  return (
    <div className={className}>
      {combatTexts.filter(item => item.position === fighter.position).map(text => (
        <div
          key={text.id}
          className={`arena___hit-text arena___hit-text-${text.position} ${text.type}`}
        >
          {messagesTypes[text.type]}
        </div>
      ))}
      <FighterImage fighter={fighter}/>
    </div>
  )
}