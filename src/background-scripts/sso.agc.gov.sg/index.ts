import { BackgroundScriptService } from 'src/services/background-script-service';
import { ContextMenuService } from 'src/services/context-menu-service';
import { initContentMenu } from './context-menu';
import { notification } from './notifications';

notification(new BackgroundScriptService());
initContentMenu(new ContextMenuService() ,new BackgroundScriptService());
