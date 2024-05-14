import * as Sentry from '@sentry/node'

const Logger = {
  log: (msg: string) => {
    console.log(msg)
    Sentry.captureMessage('Something went wrong')
  }
}

export default Logger
