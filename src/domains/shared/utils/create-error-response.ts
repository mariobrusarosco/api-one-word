export const createErrorResponse = (error: any) => {
  const { status, userMessage, debug } = error

  return { status, userMessage, debug }
}
