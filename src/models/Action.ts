export enum ACTION {
  FROM_POPUP = 'FROM_POPUP',
  NOTIFICATION = 'NOTIFICATION',
  FROM_CONTENT_SCRIPT = 'FROM_CONTENT_SCRIPT'
}

export class Action {
  constructor (public type: string, public payload: any, public tabId = 0) {}
}
