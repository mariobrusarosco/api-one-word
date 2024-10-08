declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string
      API_VERSION: string
      MEMBER_PUBLIC_ID_COOKIE: string
      JWT_SECRET: string
      ACESS_CONTROL_ALLOW_ORIGIN: string
      ENV: string
      OKTA_AUTH_COOKIE_NAME: string
    }
  }
}

export {}
