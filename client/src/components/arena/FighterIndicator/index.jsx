export default function FighterIndicator({fighter, settings}) {
  const percent = fighter.currentHealth / fighter.maxHealth;
  const staminaProgress = getStaminaProgress(fighter, settings.CRITICAL_INTERVAL);
  
  return (
    <div className={`arena___fighter-indicator arena___fighter-indicator-${fighter.position}`}>
      <span className="arena___fighter-name">
        {fighter.name}
      </span>
      <div className="arena___health-indicator">
        <div
          className={`arena___health-bar bar-${fighter.position}`}
          style={{ transform: `scaleX(${percent})` }}
        />
      </div>
      <div className="arena___stamina-indicator">
        <div className={`arena___stamina-bar bar-${fighter.position}`} style={{ transform: `scaleX(${staminaProgress})`}}>
          <div className={`arena___stamina-text ${staminaProgress === 1 ? "ready" : ""}`}>
            CRITICAL
          </div>
        </div>
      </div>
    </div>
  );
}

function getStaminaProgress(fighter, interval) {
  return Math.min(
    1,
    (Date.now() - fighter.lastCriticalTime) / interval
  );
}