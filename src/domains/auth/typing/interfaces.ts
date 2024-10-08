interface IOAuthUser {
  email: string
  name?: string
  given_name?: string
  nickname?: string
  username?: string
  sub: string
  user_id: string
  last_login: Date
}

export type IAuthUser = IOAuthUser
