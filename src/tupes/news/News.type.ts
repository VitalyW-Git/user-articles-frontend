export type NewsType = {
  _id: string,
  title: string,
  description: string,
  status?: boolean,
  date_start: string
}

export type ResponseNewsType = {
  news?: NewsType[],
  message: string[],
  success: boolean
}