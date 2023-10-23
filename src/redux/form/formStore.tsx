import {createSlice} from '@reduxjs/toolkit';
import {AppThunk, RootState} from "../index";
import axios from '../../lib/axios';
import {AuthUserEnum} from "../../enam/AuthUserEnum";
import {SuccessType} from "../../tupes/user/User.type";
import {AuthUserEnumEnum} from "../../enam/NewsFormEnum";

type Registration = {
  formAuth: {
    username: string,
    email: string,
    password: string,
    isShowModal: boolean,
  },
  formNews: {
    title: string,
    description: string,
    date_start: string,
  },
}

const initialState: Registration = {
  formAuth: {
    username: '',
    email: '',
    password: '',
    isShowModal: false,
  },
  formNews: {
    title: '',
    description: '',
    date_start: '',
  },
}

export const FormStore = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setPropertyForm: (state, {payload}) => {
      console.log(payload)
      switch (payload.key) {
        case AuthUserEnum.username:
          state.formAuth.username = payload.value;
          break;
        case AuthUserEnum.email:
          state.formAuth.email = payload.value;
          break;
        case AuthUserEnum.password:
          state.formAuth.password = payload.value;
          break;
        case AuthUserEnumEnum.title:
          state.formNews.title = payload.value;
          break;
        case AuthUserEnumEnum.description:
          state.formNews.description = payload.value;
          break;
        case AuthUserEnumEnum.date_start:
          state.formNews.date_start = payload.value;
          break;
        default:
          break;
      }
    },
    setIsShowModal: (state) => {
      console.log(state.formAuth.isShowModal)
      state.formAuth.isShowModal = !state.formAuth.isShowModal;
    },
    resetProperty: (state) => {
      state.formAuth.username = ''
      state.formAuth.email = ''
      state.formAuth.password = ''
      state.formNews.title = ''
      state.formNews.description = ''
      state.formNews.date_start = ''

    }
  },
});
export const formSelector = (state: RootState) => state.form;
export const {setPropertyForm, setIsShowModal, resetProperty} = FormStore.actions;

/** AUTH start */
export const actionSaveUser = (): AppThunk =>
  async (dispatch, getState): Promise<SuccessType> => {
    try {
      const state: RootState = getState();
      const loginProperty = {
        username: state.form.formAuth.username,
        email: state.form.formAuth.email,
        password: state.form.formAuth.password
      }
      const {data, status} = await axios.post('/auth/registration',
        loginProperty
      );
      console.log(data)
      if (status === (200 || 201) && data?.success) {
        return {user: data.user, message: data.message, success: data.success}
      }
      return {message: data.message, success: data.success}
    } catch (error: any) {
      console.log(error)
      const {message, success} = error.response.data
      if (!success) {
        return {message, success: false}
      }
      return {message: ['Ошибка при отправке данных'], success: false}
    }
  }

export const actionAuthorizationUser = (): AppThunk =>
  async (dispatch, getState): Promise<SuccessType> => {
    try {
      const state: RootState = getState();
      const loginProperty = {email: state.form.formAuth.email, password: state.form.formAuth.password}
      const {data, status} = await axios.post('/auth/login',
        loginProperty
      );
      console.log(data)
      if (status === (200 || 201) && data?.success) {
        return {user: data.user, message: data.message, success: data.success}
      }
      return {message: data.message, success: false}
    } catch (error: any) {
      const {message, success} = error.response.data
      if (!success) {
        return {message, success: false}
      }
      return {message: ['Ошибка при отправке данных'], success: false}
    }
  }
/** AUTH end */

export default FormStore.reducer;

