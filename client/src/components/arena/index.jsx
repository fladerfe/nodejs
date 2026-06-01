import { useState, useEffect, useRef, useMemo } from "react";
import StatusBar from "./StatusBar";
import Fighters from "./Fighters";
import { applyAction, changeAction } from "./arenaEngine";
import FightResultModal from "./FightResultModal";
import { createFight } from "../../services/domainRequest/fightRequest";

export default function Arena({ fighter1, fighter2, onBackToMenu, onRestart }) {
  const settings = useMemo(() => ({
    HIT_INTERVAL: 1000,
    CRITICAL_INTERVAL: 10000,
    FIGHT_DURATION: 60000,
  }), []);

  const [leftHealth, setLeftHealth] = useState(fighter1.health);
  const [rightHealth, setRightHealth] = useState(fighter2.health);
  const [leftCrit, setLeftCrit] = useState(1);
  const [rightCrit, setRightCrit] = useState(1);

  const [winner, setWinner] = useState(null);
  const [combatTexts, setCombatTexts] = useState([]);
  const [fightFinished, setFightFinished] = useState(false);
  const fightLog = useRef([]);
  
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
  const startTime = useRef(null);

  function getWinner() {
    const p1 = fighter1State.current
    const p2 = fighter2State.current


    if (p1.currentHealth === p2.currentHealth) return null;
    
    return p1.currentHealth > p2.currentHealth
      ? fighter1
      : fighter2;
  }
  
  async function handleFinish() {
    const result = getWinner();

    await createFight({
      fighter1: fighter1.id,
      fighter2: fighter2.id,
      winner: result?.id ?? null,
      log: fightLog.current
    });

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
    startTime.current = Date.now();
  }, []);

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

      p1.currentHealth = Math.max(0, p1.currentHealth - action2.damage);
      p2.currentHealth = Math.max(0, p2.currentHealth - action1.damage);
      
      setLeftHealth(p1.currentHealth);
      setRightHealth(p2.currentHealth);

      if (action1.damage > 0 || action2.damage > 0) {
        fightLog.current.push({
          fighter1Shot: action1.damage,
          fighter2Shot: action2.damage,
          fighter1Health: p1.currentHealth,
          fighter2Health: p2.currentHealth
        });
      }
  
      if (action1.effect) {
        const time = Date.now();
        p1.lastHitTime = time
        if (action1.effect === 'critical') {
          p1.lastCriticalTime = time
          setLeftCrit(p1.lastCriticalTime)
        }
      }

      if (action2.effect) {
        const time = Date.now();
        p2.lastHitTime = time
        if (action2.effect === 'critical') {
          p2.lastCriticalTime = time
          setRightCrit(p2.lastCriticalTime)
        }
      }

      if (action1.effect) showCombatText(action1.effect, p2.position);
      if (action2.effect) showCombatText(action2.effect, p1.position);

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
          leftFighter={{...fighter1, currentHealth: leftHealth, lastCriticalTime: leftCrit, position: "left"}}
          rightFighter={{...fighter2, currentHealth: rightHealth, lastCriticalTime: rightCrit, position: "right"}}
          timeLeft={timeLeft}
          settings={settings}
          />
        <Fighters
          firstFighter={{...fighter1, position: "left"}}
          secondFighter={{...fighter2, position: "right"}}
          combatTexts={combatTexts}
          />
      </div>
    </>
  );
}
