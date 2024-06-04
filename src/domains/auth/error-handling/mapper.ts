export enum AUTH_API_ERRORS {
  UNAUTHORIZED = 'unauthorized',
  NOT_FOUND = 'not_found'
}
export const ErrorMapper = {
  UNAUTHORIZED: {
    status: 401,
    debug: 'Unauthorized access. No auth cookie found.',
    userMessage:
      'You are not logged in. Please, go to Login page and provide your credentials'
  },
  TOKEN_FAILURE: {
    status: 401,
    debug: 'token-write-or-read-failure',
    userMessage: ''
  },
  NOT_FOUND: {
    status: 404,
    debug: 'not found',
    userMessage: 'This user does not exists.'
  }
}
