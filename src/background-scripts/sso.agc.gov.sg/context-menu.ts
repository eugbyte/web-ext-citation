import { ACTION, Action } from 'src/models/Action';
import { BackgroundScriptImpl } from 'src/services/background-script-service';
import { ContextMenuImpl } from 'src/services/context-menu-service';

export function initContentMenu (contextMenuService: ContextMenuImpl, backgroundScriptService: BackgroundScriptImpl) {
  contextMenuService.createConextMenu({
    id: 'selection',
    title: 'Copy With Source',
    contexts: ['selection']
  });

  contextMenuService.contextMenuOnClick((info) => {
    if (info.menuItemId !== 'selection') return;
    backgroundScriptService
      .to('CONTENT-SCRIPT')
      .sendMessage(new Action(ACTION.CONTEXT_MENU_CLICKED, ''));
  });
}
