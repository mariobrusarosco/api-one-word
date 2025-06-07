import * as Sentry from '@sentry/node'
import { nodeProfilingIntegration } from '@sentry/profiling-node'

if (process.env.NODE_ENV !== 'local') {
  Sentry.init({
    dsn: 'https://91c4e0bc109395338fe190a75b9708dd@o4506356341276672.ingest.us.sentry.io/4506356576747520',
    environment: process.env.NODE_ENV,
    integrations: [nodeProfilingIntegration()],
    // Performance Monitoring - Adjust rates based on environment
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.2 : 0.5, // 20% in prod, 50% in other envs
    profilesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 0.2, // 10% in prod, 20% in other envs
    beforeSend(event) {
      // Don't send users' personal information
      if (event.user) {
        delete event.user.ip_address;
        delete event.user.email;
      }
      return event;
    }
  })
}
