export const GlobalErrorMapper = {
  BIG_FIVE_HUNDRED: {
    status: 500,
    debug: 'internal server error',
    userMessage:
      'Sorry something went wrong when handling your data. Contact us if this error persists.'
  },
  NOT_AUTHORIZED: {
    status: 401,
    debug: 'User not authorized',
    userMessage: 'not authorized'
  }
}
