import { browser } from 'webextension-polyfill-ts';
import { ACTION, Action } from 'src/models/Action';
import { BackgroundScriptImpl, BackgroundScriptService } from 'src/services/background-script-service';

function reducer (backgroundScriptService: BackgroundScriptImpl): void {
  browser.runtime.onMessage.addListener((action: Action) => {
    const payload = action.payload;
    if (action.type === ACTION.NOTIFICATION_SUCCESS) {
      backgroundScriptService.createBasicNotification('Provision Copied', payload);
    } else if (action.type === ACTION.NOTIFICATION_ERROR) {
      backgroundScriptService.createBasicNotification('Error', payload);
    }
  });
}

reducer(new BackgroundScriptService());
