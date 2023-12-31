import {createSlice} from '@reduxjs/toolkit';
import {AppThunk, RootState} from "../index";
import axios from '../../lib/axios';
import {NewsType} from "../../tupes/news/News.type";

type NewsLis = {
  news: NewsType[]
  successNews: boolean
}

type SortNews = Pick<NewsType, "created_at">;

const initialState: NewsLis = {
  news: [],
  successNews: false
}

export const NewsStore = createSlice({
  name: 'news',
  initialState,
  reducers: {
    listMews: (state, {payload}) => {
      state.news = payload.news?.sort((a: SortNews, b: SortNews) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      state.successNews = payload.success;
    },
  },
});
export const newsSelector = (state: RootState) => state.news;

export const {listMews} = NewsStore.actions;

export const actionGetAllNews = (): AppThunk =>
  async (dispatch): Promise<void> => {
    try {
      const {data, status} = await axios.get('news/get-all');
      if ([200, 201].includes(status) && data?.success) {
        dispatch(listMews(data));
        return
      }
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }


export default NewsStore.reducer;

