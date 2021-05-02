import { ACTION, Action } from 'src/models/Action';
import { CITATION_OPTION } from 'src/models/util';
import { BackgroundScriptImpl } from 'src/services/background-script-service';
import { browser } from 'webextension-polyfill-ts';

export async function initContentMenu (backgroundScriptService: BackgroundScriptImpl) {
  const CONTEXT_MENU_ID = 'selection';
  const storage = await browser.storage.local.get();

  await browser.contextMenus.remove(CONTEXT_MENU_ID);

  backgroundScriptService.createConextMenu({
    id: CONTEXT_MENU_ID,
    title: 'Copy With Source',
    contexts: ['selection']
  });

  backgroundScriptService.contextMenuOnClick((info) => {
    if (info.menuItemId !== 'selection') return;
    const citationOption: CITATION_OPTION = storage.citationOption ?? CITATION_OPTION.SAL;
    const action = new Action(ACTION.CONTEXT_MENU_CLICKED, citationOption);
    backgroundScriptService
      .to('CONTENT-SCRIPT')
      .sendMessage(action);
  });
}
