import { ACTION, Action } from 'src/models/Action';
import { BackgroundScriptImpl } from 'src/services/background-script-service';

export function notification (backgroundScriptService: BackgroundScriptImpl): void {
  backgroundScriptService
    .from('CONTENT-SCRIPT')
    .subscribe((action: Action) => {
      const payload: string = action.payload;
      if (action.type === ACTION.NOTIFICATION_WARNING) {
        backgroundScriptService.createBasicNotification('Warning', payload);
      } else if (action.type === ACTION.NOTIFICATION_ERROR) {
        backgroundScriptService.createBasicNotification('Error', payload);
      }
    });
}
