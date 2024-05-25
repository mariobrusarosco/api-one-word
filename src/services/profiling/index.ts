import * as Sentry from '@sentry/node'

const Logger = {
  error: (msg: string) => {
    Sentry.captureMessage(msg)
  }
}

export default Logger
