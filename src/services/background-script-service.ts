import { Action } from 'src/models/Action';
import { browser, Tabs, Runtime } from 'webextension-polyfill-ts';

type subscribeFn = (message: any, sender: Runtime.MessageSender, sendResponse: (args: any) => void) => void

export interface BackgroundScriptImpl {
    sendMessage(message: Action, tabId?: number | undefined): Promise<Action>;
    to(_destination: 'CONTENT-SCRIPT' | 'BACKGROUND-SCRIPT' | 'POPUP-SCRIPT'): BackgroundScriptImpl;
    subscribe(cb: subscribeFn): void;
    from(_source: 'CONTENT-SCRIPT' | 'BACKGROUND-SCRIPT' | 'POPUP-SCRIPT'): BackgroundScriptImpl;
    createBasicNotification(title: string, message: string, iconUrl?: string): void;
}

export class BackgroundScriptService implements BackgroundScriptImpl {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  to (_destination: 'CONTENT-SCRIPT' | 'BACKGROUND-SCRIPT' | 'POPUP-SCRIPT') {
    return this;
  }

  async sendMessage (message: Action, tabId?: number): Promise<Action> {
    if (tabId == null) {
      const tabs = await browser.tabs.query({
        currentWindow: true,
        active: true
      });
      const tab: Tabs.Tab = tabs[0];
      tabId = tab.id as number;
    }

    const response: Action = await browser.tabs.sendMessage(tabId, message);
    return response;
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */
  from (_source: 'CONTENT-SCRIPT' | 'BACKGROUND-SCRIPT' | 'POPUP-SCRIPT') {
    return this;
  }

  subscribe (cb: subscribeFn) {
    browser.runtime.onMessage.addListener(cb);
  }

  createBasicNotification (title: string, message: string, iconUrl?: string) {
    browser.notifications.create({
      type: 'basic',
      title: title,
      message: message,
      iconUrl
    });
  }
}
