/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable class-methods-use-this */
import { get, merge } from 'lodash'
import { localStorageProvider } from 'provider/localStorage'
import { Subscription } from 'rxjs'

import { Fabric } from './Fabric'

interface RegisterType {
  [key: string]: Fabric<any>
}

class HydrateModule {
  static signature = '@HYDRATE'

  private _registed: RegisterType = {}

  private subscriptions: Subscription[] = []

  private get localStorage() {
    return localStorageProvider.get(HydrateModule.signature)
  }

  private set localStorage(object: any) {
    localStorageProvider.set(HydrateModule.signature, object)
  }

  private set registed(module: RegisterType) {
    this._registed = merge(this.registed, module)
  }

  get registed() {
    return this._registed
  }

  setup(modules: Fabric<any>[]) {
    this.register(modules)
    this.hydrate()
    this.subscribe()

    return () => this.unsubscribe()
  }

  register(modules: Fabric<any>[]) {
    modules.forEach(module => {
      const key = Object.getPrototypeOf(module).constructor.name

      this.registed = {
        [key]: module
      }
    })
  }

  hydrate() {
    const store = this.localStorage

    const keys = Object.getOwnPropertyNames(this._registed)

    keys.forEach(key => {
      const module = this._registed[key]

      module.next(get(store, key, {}))
    })
  }

  subscribe() {
    const keys = Object.getOwnPropertyNames(this._registed)

    this.subscriptions = keys.map(key => {
      const module = this._registed[key]
      const context = this

      return module.observable.subscribe({
        next(value) {
          const store = context.localStorage

          context.localStorage = merge(store, { [key]: value })
        }
      })
    })
  }

  unsubscribe() {
    if (this.subscriptions?.length === 0) return

    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe()
    })
  }
}

export { HydrateModule }
