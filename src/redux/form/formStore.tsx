import {createSlice} from '@reduxjs/toolkit';
import {AppThunk, RootState} from "../index";
import axios from '../../lib/axios';
import {AuthUserEnum} from "../../enam/AuthUserEnum";
import {ResponseAuthType} from "../../tupes/user/User.type";
import {AuthUserEnumEnum} from "../../enam/NewsFormEnum";
import {ResponseNewsType} from "../../tupes/news/News.type";

type FormAuthType = {
  username: string,
  email: string,
  password: string,
  isShowModal: boolean,
}
type FormNewsType = {
  title: string,
  description: string,
  date_start?: string,
  article_id?: string,
  isShowModalCreate?: boolean,
  isShowModalEdit?: boolean,
}


type FormType = {
  formAuth: FormAuthType,
  formNews: FormNewsType,
}

const initialState: FormType = {
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
    isShowModalCreate: false,
    isShowModalEdit: false,
  },
}

export const FormStore = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setPropertyForm: (state, {payload}) => {
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
    setIsShowModal: (state, {payload}) => {
      switch (payload.key) {
        case 'auth':
          state.formAuth.isShowModal = !state.formAuth.isShowModal;
          break;
        case 'createNews':
          state.formNews.isShowModalCreate = !state.formNews.isShowModalCreate;
          break;
        case 'editNews':
          state.formNews.isShowModalEdit = false;
          break;
        default:
          break;
      }
    },
    resetProperty: (state) => {
      state.formAuth.username = ''
      state.formAuth.email = ''
      state.formAuth.password = ''
      state.formNews.title = ''
      state.formNews.description = ''
      state.formNews.date_start = ''
      state.formNews.article_id = ''

    },
    fillProperty: (state, {payload}) => {
      state.formNews.title = payload.title
      state.formNews.description = payload.description
      state.formNews.article_id = payload._id
      state.formNews.isShowModalEdit = true
    }
  },
});
export const formSelector = (state: RootState) => state.form;
export const {setPropertyForm, setIsShowModal, resetProperty, fillProperty} = FormStore.actions;

/** AUTH start */
export const actionSaveUser = (): AppThunk =>
  async (dispatch, getState): Promise<ResponseAuthType> => {
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
      if (status === (200 || 201) && data?.success) {
        return {user: data.user, message: data.message, success: data.success}
      }
      return {message: data.message, success: data.success}
    } catch (error: any) {
      const {message, success} = error.response.data
      if (!success) {
        return {message, success: false}
      }
      return {message: ['Ошибка при отправке данных'], success: false}
    }
  }

export const actionAuthorizationUser = (): AppThunk =>
  async (dispatch, getState): Promise<ResponseAuthType> => {
    try {
      const state: RootState = getState();
      const loginProperty = {
        email: state.form.formAuth.email, 
        password: state.form.formAuth.password
      }
      const {data, status} = await axios.post('/auth/login',
        loginProperty
      );
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

/** NEWS start */
export const actionCreateNews = (): AppThunk =>
  async (dispatch, getState): Promise<ResponseNewsType> => {
    try {
      const state: RootState = getState();
      let loginProperty: FormNewsType = {
        title: state.form.formNews.title, 
        description: state.form.formNews.description
      }
      if (state.form.formNews.date_start?.length) {
        loginProperty = {
          ...loginProperty,
          date_start: state.form.formNews.date_start
        }
      }
      const {data, status} = await axios.post('/news/create',
        loginProperty
      );
      if (status === (200 || 201) && data?.success) {
        return {news: data.news, message: data.message, success: data.success}
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

export const actionEditNews = (): AppThunk =>
  async (dispatch, getState): Promise<ResponseNewsType> => {
    try {
      const state: RootState = getState();
      let loginProperty: FormNewsType = {
        article_id: state.form.formNews.article_id,
        title: state.form.formNews.title,
        description: state.form.formNews.description
      }
      const {data, status} = await axios.patch('/news/update',
        loginProperty
      );
      if (status === (200 || 201) && data?.success) {
        return {news: data.news, message: data.message, success: data.success}
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

/** NEWS end */

export default FormStore.reducer;

