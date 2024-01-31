import Api from './../base';

export type LoginType = {
  email: string;
  password: string;
};

export const login = (payload: LoginType) => {
  return Api.post('/user/login', { json: payload });
};
