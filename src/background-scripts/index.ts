import { BackgroundScriptService } from 'src/services/background-script-service';
import { StorageService } from 'src/services/storage-service';
import { initContentMenu } from './context-menu';
import { notification } from './notifications';

// IIFE
(() => {
  // Dependency injection
  notification(new BackgroundScriptService());
  initContentMenu(new BackgroundScriptService(), new StorageService());
})();
