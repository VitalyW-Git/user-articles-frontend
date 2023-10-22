export type UserType = {
  username?: string,
  email?: string,
  isAuth: boolean,
}

export type SuccessType = {
  user?: Omit<UserType, 'isAuth'>,
  message: string[],
  success: boolean
}