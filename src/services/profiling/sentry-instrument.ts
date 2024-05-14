import * as Sentry from '@sentry/node'
import { nodeProfilingIntegration } from '@sentry/profiling-node'

// if (process.env.NODE_ENV !== 'local') {
Sentry.init({
  dsn: 'https://91c4e0bc109395338fe190a75b9708dd@o4506356341276672.ingest.us.sentry.io/4506356576747520',
  integrations: [nodeProfilingIntegration()],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0
})
// }
