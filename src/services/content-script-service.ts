import { Action } from 'src/models/Action';
import { browser, Runtime } from 'webextension-polyfill-ts';

// return a Promise if you want to send back a response
type subscribeFn = (message: any, sender: Runtime.MessageSender) => void | Promise<any>

export interface ContentScriptImpl {
    sendMessage(message: Action): void;
    to(_destination: 'BACKGROUND-SCRIPT' | 'POPUP-SCRIPT'): ContentScriptImpl;
    subscribe(cb: subscribeFn): void;
    from(_source: 'BACKGROUND-SCRIPT' | 'POPUP-SCRIPT'): ContentScriptImpl;
}

export class ContentScriptService implements ContentScriptImpl {
  sendMessage (message: Action) {
    browser.runtime.sendMessage(message);
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */
  to (_destination: 'BACKGROUND-SCRIPT' | 'POPUP-SCRIPT') {
    return this;
  }

  subscribe (cb: subscribeFn) {
    browser.runtime.onMessage.addListener(cb);
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */
  from (_source: 'BACKGROUND-SCRIPT' | 'POPUP-SCRIPT') {
    return this;
  }
}
