import React, {useState} from 'react';
import './App.css';
import Login from "./Login";
import Chat from "./Chat";

function App() {

    const [user, setUser] = useState<string>()

    return (
        <div className="App">
            {user && <Chat user={user}/>}
            <Login login={(name) => {
                setUser(name)
            }}/>
        </div>
    );
}

export default App;
