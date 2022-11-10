/* eslint-disable prefer-const */
import { BehaviorSubject, Observable } from 'rxjs'

import { AbstractFabric, AsyncSetter, SetterCallback } from './AbstractFabric'

export class Fabric<T> extends AbstractFabric<T> {
  protected _subject: BehaviorSubject<T>

  get observable(): Observable<T> {
    return this._subject.asObservable()
  }

  get data(): T {
    return this._subject.getValue()
  }

  constructor(initialValue: T) {
    super()
    this._subject = new BehaviorSubject(initialValue)
  }

  next(callback: SetterCallback<T>): void

  next(promise: AsyncSetter<T>): void

  next(value: Partial<T>): void

  next(value: Partial<T> | AsyncSetter<T> | Function): void {
    let currentValue = value

    if (value instanceof Function) {
      const returnCallback = value(this.data)

      if (returnCallback instanceof Promise) {
        returnCallback.then(result =>
          this._subject.next({ ...this.data, ...result })
        )
        return
      }
      currentValue = returnCallback
    }

    this._subject.next({ ...this.data, ...currentValue })
  }
}
