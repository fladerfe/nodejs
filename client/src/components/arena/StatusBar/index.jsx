import FighterIndicator from "../FighterIndicator";

export default function StatusBar({leftFighter, rightFighter, leftHealth, rightHealth, timeLeft}) {
  return (
    <div className="arena___fight-status">
      <FighterIndicator fighter={leftFighter} currentHealth={leftHealth} position="left"/>
      <div className="arena___timer">{Math.ceil(timeLeft / 1000)}</div>
      <FighterIndicator fighter={rightFighter} currentHealth={rightHealth} position="right"/>
    </div>
  )
}