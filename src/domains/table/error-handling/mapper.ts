export const ErrorMapper = {
  NOT_FOUND: {
    status: 404,
    debug: 'not_found',
    userMessage: 'This table was not created yet.'
  },
  MISSING_NAME: {
    status: 400,
    debug: 'missing_name',
    userMessage: 'You must provide an name in order to create a table.'
  },
  MISSING_SEAT_ROLE: {
    status: 400,
    debug: 'missing_seat_role',
    userMessage: 'You must provide a new role for the seat you want update.'
  },
  MISSING_SEAT: {
    status: 400,
    debug: 'seat_not_found',
    userMessage: 'You are not a member of this table.'
  }
}
