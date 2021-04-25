import { browser } from 'webextension-polyfill-ts';
import { ACTION, Action } from 'src/models/Action';

// listen for actions from content-script
function reducer () {
  browser.runtime.onMessage.addListener((message: Action) => {
    if (message.type === ACTION.NOTIFICATION) createNotification(message);
  });
}

reducer();

function createNotification (message: Action) {
  browser.notifications.create({
    type: 'basic',
    title: 'Provision Copied',
    message: message.payload
  });
}

