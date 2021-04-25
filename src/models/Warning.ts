import { browser } from 'webextension-polyfill-ts';

export class Warning {
  constructor (public message: string) {}
  toString (): string {
    return `warning: ${this.message}`;
  }

  static sendNotification (message: string): void {
    browser.notifications.create('warning', {
      type: 'basic',
      title: 'Warning',
      message
    });
  }
}
