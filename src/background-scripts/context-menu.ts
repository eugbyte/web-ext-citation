import { ACTION, Action } from 'src/models/Action';
import { BackgroundScriptImpl } from 'src/services/background-script-service';

export function initContentMenu (backgroundScriptService: BackgroundScriptImpl) {
  backgroundScriptService.createConextMenu({
    id: 'selection',
    title: 'Copy With Source',
    contexts: ['selection']
  });

  backgroundScriptService.contextMenuOnClick((info) => {
    if (info.menuItemId !== 'selection') return;
    backgroundScriptService
      .to('CONTENT-SCRIPT')
      .sendMessage(new Action(ACTION.CONTEXT_MENU_CLICKED, ''));
  });
}
