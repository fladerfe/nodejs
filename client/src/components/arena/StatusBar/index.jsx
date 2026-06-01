import FighterIndicator from "../FighterIndicator";

export default function StatusBar({leftFighter, rightFighter, timeLeft, settings}) {
  return (
    <div className="arena___fight-status">
      <FighterIndicator fighter={leftFighter} settings={settings}/>
      <div className="arena___timer">{Math.ceil(timeLeft / 1000)}</div>
      <FighterIndicator fighter={rightFighter} settings={settings}/>
    </div>
  )
}

