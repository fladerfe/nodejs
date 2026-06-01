import { useState, useEffect, useRef } from "react";
import StatusBar from "./StatusBar";
import Fighters from "./Fighters";

export default function Arena({ fighter1, fighter2 }) {
  const pressedKeys = useRef(new Set());

  const fighter1State = useRef({
    attack: fighter1.power,
    defense: fighter1.defense,
    currentHealth: fighter1.health,
    lastHitTime: 0,
    lastCriticalTime: 0,
    action: null
  });

  const fighter2State = useRef({
    attack: fighter2.power,
    defense: fighter2.defense,
    currentHealth: fighter2.health,
    lastHitTime: 0,
    lastCriticalTime: 0,
    action: null
  });

  const [leftHealth, setLeftHealth] = useState(fighter1.health);
  const [rightHealth, setRightHealth] = useState(fighter2.health);
  const [timeLeft, setTimeLeft] = useState(60000);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 100));
    }, 100);

    return () => clearInterval(interval);
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
    <div className="arena___root">
      <StatusBar
        leftFighter={fighter1}
        rightFighter={fighter2}
        leftHealth={leftHealth}
        rightHealth={rightHealth}
        timeLeft={timeLeft}
      />
      <Fighters
        firstFighter={fighter1}
        secondFighter={fighter2}
      />
    </div>
  );
}