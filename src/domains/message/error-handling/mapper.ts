export const ErrorMapper = {
  MISSING_CHANNEL_ID: {
    status: 400,
    debug: 'missing key: channel',
    userMessage: 'Ops! You need to provide a valid channel id to remove it.'
  },
  MISSING_CONTENT: {
    status: 400,
    debug: 'missing key: content',
    userMessage: 'Ops! You need to provide a valid content to create a message.'
  },
  NOT_FOUND: {
    status: 404,
    debug: 'not found',
    userMessage: 'This message does not exists.'
  }
}
