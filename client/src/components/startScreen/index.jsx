import { useState } from 'react';
import SignInUpPage from '../signInUpPage';
import { isSignedIn } from '../../services/authService';
import Fight from '../fight';
import SignOut from '../signOut';
import Arena from '../arena';
import FightHistory from '../fightHistory';

export default function StartScreen() {
    const [loggedIn, setLoggedIn] = useState(isSignedIn());
    const [battleData, setBattleData] = useState(null);
    const [showHistory, setShowHistory] = useState(false)
    const [fightKey, setFightKey] = useState(0);

    if (!loggedIn) {
        return <SignInUpPage setIsLoggedIn={setLoggedIn} />;
    }

    if (showHistory) {
        return <FightHistory onBack={() => setShowHistory(false)}/>;
    }

    if (!battleData) {
        return (
            <>
                <Fight onStartFight={setBattleData} onShowHistory={() => setShowHistory(true)}/>
                <SignOut isSignedIn={loggedIn} onSignOut={() => setLoggedIn(false)} />
            </>
        );
    }

    if (battleData) {
        return (
            <Arena
                key={fightKey}
                fighter1={battleData.fighter1}
                fighter2={battleData.fighter2}
                onRestart={() => setFightKey(prev => prev + 1)}
                onBackToMenu={() => {
                    setBattleData(null);
                }}
            />
        );
    }
}
