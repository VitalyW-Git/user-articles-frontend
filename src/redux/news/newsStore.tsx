import {createSlice} from '@reduxjs/toolkit';
import {AppThunk, RootState} from "../index";
import axios from '../../lib/axios';
import {NewsAllType} from "../../tupes/news/NewsAll.type";

type NewsLis = {
  news: NewsAllType[]
  successNews: boolean
}

const initialState: NewsLis = {
  news: [],
  successNews: false
}

export const NewsStore = createSlice({
  name: 'news',
  initialState,
  reducers: {
    listMews: (state, {payload}) => {
      state.news = payload.news;
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
      if (status === (200 || 201) && data?.success) {
        dispatch(listMews(data));
        return
      }
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }


export default NewsStore.reducer;

