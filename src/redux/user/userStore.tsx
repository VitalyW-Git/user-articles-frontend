import {createSlice} from '@reduxjs/toolkit';
import {UserType} from '../../tupes/user/User.type'
import {AppThunk, RootState} from "../index";
import axios from '../../lib/axios';
import {NewsAllType} from "../../tupes/news/NewsAll.type";

type UserData = {
  user: UserType,
  isLoading: boolean,
  userNews: NewsAllType[]
}

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
      state.user = {...payload.user, isAuth: payload.success};
      state.isLoading = false;
    },
    userNews: (state, {payload}) => {
      state.userNews = payload.news;
    },
  },
});
export const userSelector = (state: RootState) => state.user;
export const {authUser, userNews} = UserStore.actions;

export const actionAuthUser = (): AppThunk =>
  async (dispatch): Promise<void> => {
    try {
      const {data, status} = await axios.post('/user/check-user');
      if (status === (200 || 201) && data?.success) {
        dispatch(authUser(data));
        return
      }
      dispatch(authUser({user: {username: '', email: ''}, success: false}));
      console.log(data)
    } catch (error) {
      dispatch(authUser({user: {username: '', email: ''}, success: false}));
      console.log(error)
    }
  }

export const actionAllListNews = (): AppThunk =>
  async (dispatch): Promise<void> => {
    try {
      const {data, status} = await axios.get('/user/news');
      if (status === (200 || 201) && data?.success) {
        dispatch(userNews(data));
        return
      }
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

export default UserStore.reducer;

