import { browser } from 'webextension-polyfill-ts';
import { ACTION, Action } from 'src/models/Action';

function reducer() {
  browser.runtime.onMessage.addListener((message: Action) => {
    if (message.type === ACTION.NOTIFICATION) createNotification(message);
  });
}

function createNotification(message: Action) {
  browser.notifications.create({
    "type": "basic",
    "title": "Copied",
    "message": message.payload
  });
}

reducer();
