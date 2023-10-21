import axios from 'axios';

// let url = process.env.REACT_APP_URL_BACK_PROD
// if (process.env.NODE_ENV !== 'production') {
//   url = process.env.REACT_APP_URL_BACK_DEV
// }

const instance = axios.create({
  baseURL: process.env.REACT_APP_URL_BACK_PROD,
});

export default instance;