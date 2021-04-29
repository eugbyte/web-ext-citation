import React, { useState } from 'react';
import { Card } from './components/card';
import { Dropdown } from './components/dropdown';
import { ACTION, Action } from './models/Action';
import { BackgroundScriptImpl, BackgroundScriptService } from './services/background-script-service';
import './styles/styles.css';

const colors: Record<string, string> = {};
colors[ACTION.PROVISION_SUCCESS] = "green-500";
colors[ACTION.NOTIFICATION_WARNING] = "yellow-500";
colors[ACTION.PROVISION_ERROR] = "red-500";
colors["DEFAULT"] = "blue-500";

function App() {
    const [action, setAction] = useState<Action>(new Action("DEFAULT", ""));
    const [backgroundScriptService] = useState<BackgroundScriptImpl>(new BackgroundScriptService());

    const [option, setOption] = useState("");
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setOption(event.target.value as string);
      };

    // send action to content-script
    backgroundScriptService
        .to("CONTENT-SCRIPT")
        .sendMessage(new Action(ACTION.PROVISION_STATUS, ""))
        .then((response: Action) => {
            setAction(response);
        });
    
    return (
        <div style={{width: "300px"}} className="p-2">
            <Dropdown handleChange={handleChange} />
            <p className="font-semibold text-xs text text-blue-500 text-center">Legal Citer</p> 
            { action.payload &&
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
            
                    
        </div>
    );
}
export default App;
