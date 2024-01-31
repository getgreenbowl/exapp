import axios, { AxiosError, AxiosResponse } from 'axios';
import { Storage } from '../utils/storage';

const fetchClient = () => {
  const defaultOptions = {
    baseURL: 'http://192.168.29.193:3000',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const instance = axios.create(defaultOptions);
  instance.interceptors.request.use(async (config: any) => {
    const token = await Storage.get('token');
    config.headers.Authorization = token;

    return config;
  });
  instance.interceptors.response.use(
    async (response: AxiosResponse) => {
      // const [encryption, _enc_error] = await LocalStorage.get(
      //   GLOBAL_CONSTANTS.lsKeys.encryption
      // );
      // if (encryption) {
      //   // response.data = decrypt(response.data)
      // }
      return response;
    },
    async (err: AxiosError) => {
      console.log('api request err-------------------', err.response);
      // const [token, _error] = await LocalStorage.get(GLOBAL_CONSTANTS.lsKeys.token);
      // store.dispatch(handleLogout(true));

      // if (err?.response?.data === "token expired") {
      //   store.dispatch(handleLogout(true));
      // }
      return Promise.reject(err.response);
    }
  );
  return instance;
};

const BaseApi = fetchClient();
export default BaseApi;
