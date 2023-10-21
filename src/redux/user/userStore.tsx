import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserType} from '../../tupes/user/User.type'
import {AppThunk} from "../index";
import axios from '../../lib/axios';

const initialState: UserType = {
  username: '',
  email: '',
  isAuth: false,
}

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<string>) {

    },
  },
});

export const {addItem} = UserSlice.actions;

export const actionGetAllNews = (): AppThunk =>
  async dispatch => {
    try {
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        }
      };
      const data = await axios.get('news/get-all',
        {
          ...config,
          withCredentials: true
        }
      );
      console.log('actionGetAllNews', data)
    } catch (error) {
      console.error(error);
    }
  }

export const actionAuthUser = (): AppThunk =>
  async dispatch => {
    try {
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        }
      };
      const data = await axios.post('/user/check-user',
        {},
        {
          ...config,
          withCredentials: true
        },
      );
      console.log('actionAuthUser', data)
    } catch (error) {
      console.error(error);
    }
  }

export default UserSlice.reducer;

