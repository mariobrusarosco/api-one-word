export const createErrorResponse = error => {
  const { status, userMessage, debug } = error

  return { status, userMessage, debug }
}
