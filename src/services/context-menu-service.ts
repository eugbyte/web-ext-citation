import { Menus, browser, Tabs } from "webextension-polyfill-ts";

export interface ContextMenuImpl {
    createConextMenu({ id, title, contexts, icons, checked }: Menus.CreateCreatePropertiesType): void;
    contextMenuOnClick(cb: (info: Menus.OnClickData, tab?: Tabs.Tab | undefined) => void): void;
}

export class ContextMenuService {
    createConextMenu ({ id, title, contexts, icons, checked }: Menus.CreateCreatePropertiesType) {
        browser.contextMenus.create({ id, title, contexts, icons, checked });
      }
    
      contextMenuOnClick (cb: (info: Menus.OnClickData, tab?: Tabs.Tab | undefined) => void) {
        browser.contextMenus.onClicked.addListener(cb);
      }
}