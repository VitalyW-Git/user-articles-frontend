export type NewsAllType = {
  _id: string,
  title: string,
  description: string,
  status: boolean,
  date_start: string
}

export type ResponseNewsAllType = {
  news: NewsAllType[],
  success: boolean,
  message?: string
}