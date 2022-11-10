/* eslint-disable class-methods-use-this */
import axios, { AxiosError, AxiosInstance } from 'axios'
import baseUrl from 'constants/baseUrl'
import { tokenErrors } from 'constants/errors'
import route from 'constants/route'
import { localStorageProvider } from 'provider/localStorage'
import { navigate } from 'provider/router/navigate'
import { userStore } from 'store'
import { HydrateModule } from 'store/config'

const instanceAxios = axios.create({
  baseURL: baseUrl.BASE
})

export class Repository {
  protected axios: AxiosInstance

  protected get base(): typeof baseUrl {
    return baseUrl
  }

  constructor() {
    this.axios = instanceAxios

    this.interceptor()
    this.setToken()
  }

  protected setToken() {
    const moduleName = Object.getPrototypeOf(userStore).constructor.name
    const { token } =
      localStorageProvider.get(HydrateModule.signature)[moduleName] || {}
    this.axios.defaults.headers.Authorization = `${baseUrl.PREFIX} ${token}`
  }

  protected interceptor() {
    this.axios.interceptors.response.use(
      response => response,
      (reject: AxiosError<{ message: string }>) => {
        if (
          tokenErrors.includes(reject.response?.data?.message || '') &&
          reject.response?.status === 401
        ) {
          userStore.next({ token: '' })
          this.setToken()
          navigate.go(route.LOGIN.BASE[0])
        }

        throw reject
      }
    )
  }
}
