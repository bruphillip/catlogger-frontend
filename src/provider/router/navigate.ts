import { NavigateFunction, NavigateOptions, To } from 'react-router'

class Navigate {
  private _navigate: NavigateFunction | undefined

  go(to: To, options?: NavigateOptions) {
    if (this._navigate) this._navigate(to, options)
  }

  set(nav: NavigateFunction) {
    if (!this._navigate) this._navigate = nav
  }
}

export const navigate = new Navigate()
