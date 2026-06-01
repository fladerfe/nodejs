import { useState } from 'react';
import SignInUpPage from '../signInUpPage';
import { isSignedIn } from '../../services/authService';
import Fight from '../fight';
import SignOut from '../signOut';
import Arena from '../arena';

export default function StartScreen() {
    const [loggedIn, setLoggedIn] = useState(isSignedIn());
    const [battleData, setBattleData] = useState(null);

    if (!loggedIn) {
        return <SignInUpPage setIsLoggedIn={setLoggedIn} />;
    }

    if (!battleData) {
        return (
            <>
                <Fight onStartFight={setBattleData}/>
                <SignOut isSignedIn={loggedIn} onSignOut={() => setLoggedIn(false)} />
            </>
        );
    }

    if (battleData) {
        return (
            <Arena
                fighter1={battleData.fighter1}
                fighter2={battleData.fighter2}
            />
        );
    }
}
