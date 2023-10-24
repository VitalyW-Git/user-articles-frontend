export type UserType = {
  username?: string,
  email?: string,
  isAuth: boolean,
}

export type ResponseAuthType = {
  user?: Omit<UserType, 'isAuth'>,
  message: string[],
  success: boolean
}