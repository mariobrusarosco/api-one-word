declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string
      API_VERSION: string
      JWT_SECRET: string
      ACESS_CONTROL_ALLOW_ORIGIN: string
      NODE_ENV: string
    }
  }
}

export {}
