function getHitPower(fighter) {
  const criticalHitChance = Math.random() + 1;
  return fighter.attack * criticalHitChance;
}

function getBlockPower(fighter) {
  const dodgeChance = Math.random() + 1;
  return fighter.defense * dodgeChance;
}

export function getDamage(attacker, defender) {
  const hitPower = getHitPower(attacker);
  const blockPower = getBlockPower(defender);

  return Math.max(0, hitPower - blockPower);
}