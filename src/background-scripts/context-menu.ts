import { ACTION, Action } from 'src/models/Action';
import { CITATION_OPTION } from 'src/models/util';
import { BackgroundScriptImpl } from 'src/services/background-script-service';
import { StorageImpl } from 'src/services/storage-service';
import { browser } from 'webextension-polyfill-ts';

export async function initContentMenu (backgroundScriptService: BackgroundScriptImpl, storageService: StorageImpl) {
  const CONTEXT_MENU_ID = 'selection';

  try {
    await browser.contextMenus.remove(CONTEXT_MENU_ID);
  } catch (error) {
    console.log({ error });
  }

  backgroundScriptService.createContextMenu({
    id: CONTEXT_MENU_ID,
    title: 'Copy With Source',
    contexts: ['selection']
  });

  backgroundScriptService.contextMenuOnClick(async (info) => {
    if (info.menuItemId !== CONTEXT_MENU_ID) return;
    const citationOption: CITATION_OPTION = await storageService.getFromStorage('citationOption') ?? CITATION_OPTION.SAL;
    const action: Action = new Action(ACTION.CONTEXT_MENU_CLICKED, citationOption);
    backgroundScriptService
      .to('CONTENT-SCRIPT')
      .sendMessage(action);
  });
}
