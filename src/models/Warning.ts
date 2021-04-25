import { browser } from 'webextension-polyfill-ts';
import { Action, ACTION } from './Action';

export class Warning {
  constructor (public message: string) {}
  toString (): string {
    return `warning: ${this.message}`;
  }

  static sendNotification (message: string): void {
    browser.runtime.sendMessage(new Action(ACTION.NOTIFICATION_WARNING, message));
  }
}
