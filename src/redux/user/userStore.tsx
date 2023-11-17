import {createSlice} from '@reduxjs/toolkit';
import {UserType} from '../../tupes/user/User.type'
import {AppThunk, RootState} from "../index";
import axios from '../../lib/axios';
import {NewsType} from "../../tupes/news/News.type";

type UserData = {
  user: UserType,
  isLoading: boolean,
  userNews: NewsType[]
}

type SortNews = Pick<NewsType, "created_at">;

const initialState: UserData = {
  user: {username: '', email: '', isAuth: false},
  isLoading: true,
  userNews: [],
}

export const UserStore = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authUser: (state, {payload}) => {
      state.user = {
        ...payload.user,
        isAuth: payload.success
      };
      state.isLoading = false;
    },
    userNews: (state, {payload}) => {
      if (!payload.news?.length) {
        return
      }
      state.userNews = payload.news?.sort((a: SortNews, b: SortNews) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    },
    addNews: (state, {payload}) => {
      state.userNews.unshift(payload)
    },
    updateNews: (state, {payload}) => {
      state.userNews.forEach((item: NewsType, index: number) => {
        if (item._id == payload._id) {
          state.userNews[index] = payload
        }
      })
    },
    deleteNews: (state, {payload}) => {
      state.userNews.forEach((item: NewsType, index: number) => {
        if (item._id === payload._id) {
          state.userNews[index].status = false
        }
      })
    }
  },
});
export const userSelector = (state: RootState) => state.user;
export const {authUser, userNews, addNews, updateNews, deleteNews} = UserStore.actions;

export const actionCheckAuthUser = (): AppThunk =>
  async (dispatch): Promise<void> => {
    try {
      const {data, status} = await axios.post('/user/check-user');
      if ([200, 201].includes(status) && data?.success) {
        await dispatch(authUser(data));
        console.log('dispatch1')
        return
      }
      console.log('dispatch2')
      await dispatch(authUser({user: {username: '', email: ''}, success: false}));
    } catch (error) {
      await dispatch(authUser({user: {username: '', email: ''}, success: false}));
    }
  }

export const actionAllListNews = (): AppThunk =>
  async (dispatch): Promise<{message: string[], success: boolean} | void> => {
    try {
      const {data, status} = await axios.get('/user/news');
      if ([200, 201].includes(status) && data?.success) {
        await dispatch(userNews(data));
        return
      }
    } catch (error: any) {
      const {status, data} = error.response
      console.log(error)
      if ([400, 401].includes(status) || data.isAuth) {
        return {message: ['Пользователь не авторизован'], success: data.success}
      }
    }
  }

export const actionDeleteNews = (news: NewsType): AppThunk =>
  async (dispatch): Promise<{message: string[], success: boolean} | void> => {
    try {
      const {data, status} = await axios.delete(`/news/delete/${news._id}`);
      if ([200, 201].includes(status) && data?.success) {
        await dispatch(deleteNews(news));
        return
      }
    } catch (error) {
      return {message: ['Ошибка при удалении'], success: false}
    }
  }

export default UserStore.reducer;

