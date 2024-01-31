import { Response } from "greenbowl-schema"
import BaseApi from "./base"

export class Fetcher {
  static get<T>(url: string) {
    return BaseApi.get<Response<T>>(url)
  }

  static post(url: string, body: any) {
    return BaseApi.post(url, body)
  }

  static put(url: string, body: any) {
    return BaseApi.get(url, body)
  }

  static delete(url: string) {
    return BaseApi.delete(url)
  }
}
