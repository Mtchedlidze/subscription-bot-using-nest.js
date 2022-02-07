export enum Reply {
  START = `Welcome to <b>weather subscription bot</b>, send <i>time</i> and <i>location</i> to get daily forecast, are you ready? <b>/proceed</b>`,
  REQUEST_LOCATION = 'One last step, send location',
  REQUEST_TIME = 'Send what time you want to get daily forecast',
  FINISH = 'Thanks! you subscribed to the bot',
}
