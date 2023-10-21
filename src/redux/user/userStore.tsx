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

export const actionAuthUser = (): AppThunk =>
  async dispatch => {
    try {
      // const config = {
      //   headers: {
      //     "Access-Control-Allow-Origin": "*",
      //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      //   }
      // };
      const data = await axios.get('news/get-all',
        {
          withCredentials: true
        }
      );
      // const data = await axios.post('/user/check-user',
      //   {},
      //   {
      //     withCredentials: true
      //   },
      // );
      // fetch("http://localhost:3000/news/get-all", {credentials: "include"})
      //   .then(res => res.json())
      //   .then(data => {
      //     console.log(JSON.stringify(data))
      //   })
      //   .catch(error => {
      //     console.log(JSON.stringify(error.message))
      //   })

      console.log('actionAuthUser', data)
    } catch (error) {
      console.error(error);
    }
  }

export default UserSlice.reducer;

