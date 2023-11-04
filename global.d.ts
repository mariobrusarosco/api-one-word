declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string
      API_VERSION: string
      TOKEN_KEY: string
      ACESS_CONTROL_ALLOW_ORIGIN: string
      NODE_ENV: string
    }
  }
}

export {}
