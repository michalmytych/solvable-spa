import Pusher from 'pusher-js'

export const getPusher = () => {
  if (process.env.REACT_APP_DEBUG_MODE) {
    Pusher.logToConsole = true
  }

  return new Pusher(process.env.REACT_APP_PUSHER_KEY, {
    cluster: process.env.REACT_APP_PUSHER_CLUSTER,
    encrypted: true,
  });
}
