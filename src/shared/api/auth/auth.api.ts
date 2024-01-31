import BaseApi from "../base"
import { PartialUser, R_Login as LoginResponse, TUser } from "greenbowl-schema"

export const loginUser = (payload: Pick<TUser, "mobile" | "password">) => {
  return BaseApi.post<LoginResponse>("/user/login", payload)
}

export const registerUser = (payload: PartialUser) => {
  return BaseApi.post("/user/register", payload)
}
