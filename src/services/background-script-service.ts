import { Action } from 'src/models/Action';
import { browser, Tabs, Runtime, Menus } from 'webextension-polyfill-ts';

// return a Promise if you want to send back a response
type subscribeFn = (message: any, sender: Runtime.MessageSender) => void | Promise<any>;

export interface BackgroundScriptImpl {
    sendMessage(message: Action, tabId?: number | undefined): Promise<Action>;
    to(_destination: 'CONTENT-SCRIPT' | 'BACKGROUND-SCRIPT' | 'POPUP-SCRIPT'): BackgroundScriptImpl;
    subscribe(cb: subscribeFn): void;
    from(_source: 'CONTENT-SCRIPT' | 'BACKGROUND-SCRIPT' | 'POPUP-SCRIPT'): BackgroundScriptImpl;
    createBasicNotification(title: string, message: string, iconUrl?: string): void;
    createContextMenu({ id, title, contexts, icons, checked }: Menus.CreateCreatePropertiesType): void;
    contextMenuOnClick(cb: (info: Menus.OnClickData, tab?: Tabs.Tab | undefined) => void): void;
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

  createContextMenu ({ id, title, contexts, icons, checked }: Menus.CreateCreatePropertiesType) {
    browser.contextMenus.create({ id, title, contexts, checked });
  }

  contextMenuOnClick (cb: (info: Menus.OnClickData, tab?: Tabs.Tab | undefined) => void) {
    browser.contextMenus.onClicked.addListener(cb);
  }
}
