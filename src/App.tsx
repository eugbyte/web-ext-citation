import React, { useEffect, useState } from 'react';
import { browser, Storage } from 'webextension-polyfill-ts';
import { Card } from './components/card';
import { Dropdown } from './components/dropdown';
import { ACTION, Action } from './models/Action';
import { CITATION_OPTION } from './models/util';
import { BackgroundScriptImpl, BackgroundScriptService } from './services/background-script-service';
import './styles/styles.css';

const colors: Record<string, string> = {};
colors[ACTION.PROVISION_SUCCESS] = "green-500";
colors[ACTION.NOTIFICATION_WARNING] = "yellow-500";
colors[ACTION.PROVISION_ERROR] = "red-500";
colors["DEFAULT"] = "blue-500";

function App() {
    const [action, setAction] = useState<Action | null>(null);
    const [backgroundScriptService] = useState<BackgroundScriptImpl>(new BackgroundScriptService());

    const [citationOption, setCitationOption] = useState<CITATION_OPTION | null>(null);
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCitationOption(event.target.value as CITATION_OPTION);
    };

    const sendMessageToContentScript = async () => {
        const response: Action = await backgroundScriptService
            .to("CONTENT-SCRIPT")
            .sendMessage(new Action(ACTION.PROVISION_STATUS, citationOption));
        setAction(response);
    }

    useEffect(() => {
        const sync = async () => {
            const storage = await browser.storage.local.get();
            let storageCitationOption: CITATION_OPTION | null = storage["citationOption"];
            if (storageCitationOption == null) {
                setCitationOption(CITATION_OPTION.SAL);
            } else {
                setCitationOption(storageCitationOption);
            }
            await sendMessageToContentScript();
        }
        sync();
    }, []);

    useEffect(() => {
        if (citationOption == null) return;
        const sync = async () => {
            await browser.storage.local.set({citationOption});   
            await sendMessageToContentScript();
        }
        sync();
    }, [citationOption]);

    return (
        <div style={{width: "300px"}} className="p-2">
            <p className="font-bold text-xs text text-blue-500 text-center">Legal Citation</p>             
            { action?.payload &&
            <>
                <p className={`font-bold text-xs 
                    text-${colors[action.type]}`}>
                    Most recent:
                </p>
                <Card className={`items-start 
                    p-1 
                    bg-${colors[action.type]}`}>
                    <p className="text-white text-xs font-semibold">{action?.payload}</p>
                </Card>    
            </>
            }  
            { citationOption &&
                <Dropdown handleChange={handleChange} defaultValue={citationOption}/>
            }                    
                    
        </div>
    );
}
export default App;
