import { useState, useEffect, useRef, useMemo } from "react";
import StatusBar from "./StatusBar";
import Fighters from "./Fighters";
import { applyAction, changeAction } from "./arenaEngine";
import FightResultModal from "./FightResultModal";

export default function Arena({ fighter1, fighter2, onBackToMenu, onRestart }) {
  const settings = useMemo(() => ({
    HIT_INTERVAL: 1000,
    CRITICAL_INTERVAL: 10000,
    FIGHT_DURATION: 60000,
  }), []);

  const [winner, setWinner] = useState(null);
  const [combatTexts, setCombatTexts] = useState([]);
  const [fightFinished, setFightFinished] = useState(false);
  
  const pressedKeys = useRef(new Set());
  const intervalRef = useRef(null);
  
  const fighter1State = useRef({
    name: fighter1.name,
    image: fighter1.image,
    position: 'left',
    attack: fighter1.power,
    defense: fighter1.defense,
    maxHealth: fighter1.health,
    currentHealth: fighter1.health,
    lastHitTime: 0,
    lastCriticalTime: 0,
    action: null
  });
  
  const fighter2State = useRef({
    name: fighter2.name,
    image: fighter2.image,
    position: "right",
    attack: fighter2.power,
    defense: fighter2.defense,
    maxHealth: fighter2.health,
    currentHealth: fighter2.health,
    lastHitTime: 0,
    lastCriticalTime: 0,
    action: null
  });
  
  const [timeLeft, setTimeLeft] = useState(settings.FIGHT_DURATION);
  const startTime = useRef(Date.now());

  function getWinner() {
    const p1 = fighter1State.current;
    const p2 = fighter2State.current;
    
    if (p1.currentHealth === p2.currentHealth) return null;
    
    return p1.currentHealth > p2.currentHealth
      ? fighter1
      : fighter2;
  }
  
  function handleFinish() {
    const result = getWinner();
    setWinner(result);
    setFightFinished(true);
  }
  function showCombatText(type, position) {
    if (!type) return
    const id = crypto.randomUUID();
    setCombatTexts(prev => [
      ...prev,
      { type, position, id }
    ]);

    setTimeout(() => {
      setCombatTexts(prev =>
        prev.filter(t => t.id !== id)
      );
    }, 800);
  }

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (!intervalRef.current) return;
      
      setTimeLeft(Math.max(0, settings.FIGHT_DURATION - (Date.now() - startTime.current)));
      
      const p1 = fighter1State.current;
      const p2 = fighter2State.current;
      
      p1.action = changeAction("One", pressedKeys.current);
      p2.action = changeAction("Two", pressedKeys.current);
      
      const action1 = applyAction(p1, p2, settings);
      const action2 = applyAction(p2, p1, settings);
      
      p2.currentHealth = Math.max(0, p2.currentHealth - action1.damage);
      p1.currentHealth = Math.max(0, p1.currentHealth - action2.damage);
  
      if (action1.effect) {
        const time = Date.now();
        p1.lastHitTime = time
        if (action1.effect === 'critical') {
          p1.lastCriticalTime = time
        }
      }

      if (action2.effect) {
        const time = Date.now();
        p2.lastHitTime = time
        if (action2.effect === 'critical') {
          p2.lastCriticalTime = time
        }
      }

      showCombatText(action1.effect, p2.position)
      showCombatText(action2.effect, p1.position)

      const isTimeOver = Date.now() - startTime.current >= settings.FIGHT_DURATION;
      const isFightOver =
        p1.currentHealth <= 0 ||
        p2.currentHealth <= 0 ||
        isTimeOver;

      if (isFightOver) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        handleFinish();
        return;
      }
      
    }, 100);
    
    return () => clearInterval(intervalRef.current);
  }, []);
  
  useEffect(() => {
    const handleKeyDown = e => pressedKeys.current.add(e.code);
    const handleKeyUp = e => pressedKeys.current.delete(e.code);
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);
  

  
  return (
    <>
      <FightResultModal
        open={fightFinished}
        winner={winner}
        onRestart={onRestart}
        onBackToMenu={onBackToMenu}
      />
      <div className="arena___root">
        <StatusBar
          leftFighter={fighter1State.current}
          rightFighter={fighter2State.current}
          timeLeft={timeLeft}
          settings={settings}
          />
        <Fighters
          firstFighter={fighter1State.current}
          secondFighter={fighter2State.current}
          combatTexts={combatTexts}
          />
      </div>
    </>
  );
}
