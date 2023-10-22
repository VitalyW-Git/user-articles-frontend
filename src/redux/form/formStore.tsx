import {createSlice} from '@reduxjs/toolkit';
import {AppThunk, RootState} from "../index";
import axios from '../../lib/axios';
import {RegistrationUserEnum} from "../../enam/RegistrationUser.enum";
import {SuccessType} from "../../tupes/user/User.type";

type Registration = {
  username: string,
  email: string,
  password: string,
  isShowModal: boolean,
}

const initialState: Registration = {
  username: '',
  email: '',
  password: '',
  isShowModal: false,
}

export const FormStore = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setPropertyForm: (state, {payload}) => {
      console.log(payload)
      switch (payload.key) {
        case RegistrationUserEnum.username:
          state.username = payload.value;
          break;
        case RegistrationUserEnum.email:
          state.email = payload.value;
          break;
        case RegistrationUserEnum.password:
          state.password = payload.value;
          break;
        default:
          break;
      }
    },
    setIsShowModal: (state) => {
      console.log(state.isShowModal)
      state.isShowModal = !state.isShowModal;
    },
    resetProperty: (state) => {
      state.username = ''
      state.email = ''
      state.password = ''
    }
  },
});
export const formSelector = (state: RootState) => state.form;
export const {setPropertyForm, setIsShowModal, resetProperty} = FormStore.actions;

export const actionSaveUser = (): AppThunk =>
  async (dispatch, getState): Promise<SuccessType> => {
    try {
      const state: RootState = getState();
      const loginProperty = {username: state.form.username, email: state.form.email, password: state.form.password}
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
      const loginProperty = {email: state.form.email, password: state.form.password}
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

export default FormStore.reducer;

