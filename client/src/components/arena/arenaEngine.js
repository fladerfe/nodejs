import controls from "../../constants/controls";
import { getDamage } from "./fightUtils";

export function applyAction(fighter, opponent, settings) {
  const canAttack = canHit(fighter.lastHitTime, settings.HIT_INTERVAL);
  const canCriticalAttack = canHit(fighter.lastCriticalTime, settings.CRITICAL_INTERVAL);

  switch (fighter.action) {
    case 'attack': {
      if (!canAttack) return { damage: 0, effect: null };

      const result = basicAttack(fighter, opponent);
      return result;
    }

    case 'critical': {
      if (!canCriticalAttack || !canAttack) return { damage: 0, effect: null };

      const result = criticalAttack(fighter, opponent);
      return result;
    }

    default:
      return { damage: 0, effect: null };
  }
}

function basicAttack(fighter, opponent) {
  if (opponent.action === 'block') {
    return { damage: 0, effect: "block" }
  }
  
  const damage = getDamage(fighter, opponent);
  if (damage === 0) {
    return { damage: 0, effect: "dodge" }
  }
  return { damage, effect: "hit" }
}

function criticalAttack(fighter) {
  return { 
    damage: getCriticalDamage(fighter), 
    effect: "critical" };
}

function canHit(lastHitTime, interval) {
  return Date.now() - lastHitTime > interval;
}

export function changeAction(player, pressedKeys) {
  if (pressedKeys.has(controls[`Player${player}Block`])) {
    return "block";
  }

  if (isCriticalPressed(
      controls[`Player${player}CriticalHitCombination`],
      pressedKeys)
  ) {
    return "critical";
  }

  if (pressedKeys.has(controls[`Player${player}Attack`])) {
    return "attack";
  }

  return null;
}

function getCriticalDamage(fighter) {
  return fighter.attack * 2;
}

function isCriticalPressed(combination, pressedKeys) {
  return combination.every(key =>
    pressedKeys.has(key)
  );
}