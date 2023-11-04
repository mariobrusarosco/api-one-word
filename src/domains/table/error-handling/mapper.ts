export enum TABLE_API_ERRORS {
  DUPLICATED_LABEL = 'duplicated_label',
  NOT_FOUND = 'not_found'
}

export const ErrorMapper = {
  NOT_FOUND: {
    status: 404,
    debug: 'not found',
    userMessage: 'This table was not created yet.'
  },
  MISSING_NAME: {
    status: 400,
    debug: 'missing name',
    userMessage: 'You must provide an name in order to create a table.'
  }
}
