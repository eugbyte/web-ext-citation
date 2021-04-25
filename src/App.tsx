import React, { useState } from 'react';
import { browser, Tabs } from 'webextension-polyfill-ts';
import { ACTION, Action } from './models/Action';
import './styles/styles.css';

function App() {
    console.log("From App.tsx");
    const [message, setMessage] = useState("");

    // send action to content-script
    queryContentScript().then((response: Action) => {
        if (response.type === ACTION.FROM_CONTENT_SCRIPT) {
            setMessage(response.payload);
        }
    });
    
    return (
        <div className="text-red-500">
            <p>Hello World</p>
            <p>{message}</p>
        </div>
    );
}
export default App;


async function queryContentScript(): Promise<Action> {
    const tabs = await browser.tabs.query({
        currentWindow: true,
        active: true
    });
    const tab: Tabs.Tab  = tabs[0];
    const response: Action = await browser.tabs.sendMessage(tab.id as number, new Action(ACTION.FROM_POPUP, ""));
    await browser.tabs.sendMessage(tab.id as number, new Action(ACTION.NOTIFICATION, ""));
    return response;    
}