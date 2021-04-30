import { BackgroundScriptService } from 'src/services/background-script-service';
import { initContentMenu } from './context-menu';
import { notification } from './notifications';

notification(new BackgroundScriptService());
initContentMenu(new BackgroundScriptService());
