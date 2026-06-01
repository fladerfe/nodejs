export default function FighterIndicator({fighter, currentHealth, position}) {
  const percent = currentHealth / fighter.health;

  return (
    <div className={`arena___fighter-indicator arena___fighter-indicator-${position}`}>
      <span className="arena___fighter-name">
        {fighter.name}
      </span>
      <div className="arena___health-indicator">
        <div
          className="arena___health-bar"
          style={{ transform: `scaleX(${percent})` }}
        />
      </div>
      <div className="arena___stamina-indicator">
        <div className="arena___stamina-bar">
          <div className="arena___stamina-text">
            CRITICAL
          </div>
        </div>
      </div>
    </div>
  );
}