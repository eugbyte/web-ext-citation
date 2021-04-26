import React, { useState } from 'react';
import { ACTION, Action } from './models/Action';
import { BackgroundScriptImpl, BackgroundScriptService } from './services/background-script-service';
import './styles/styles.css';

function App() {
    console.log("From App.tsx");
    const [message, setMessage] = useState("");
    const [backgroundScriptService] = useState<BackgroundScriptImpl>(new BackgroundScriptService());

    // send action to content-script
    backgroundScriptService
        .to("CONTENT-SCRIPT")
        .sendMessage(new Action(ACTION.FROM_POPUP, ""))
        .then((response: Action) => {
            setMessage(response.payload);
    });
    
    return (
        <div className="text-red-500">
            <p>Hello World</p>
            <p>{message}</p>
        </div>
    );
}
export default App;
