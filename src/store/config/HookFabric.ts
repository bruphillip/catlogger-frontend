import { useState, useEffect } from 'react'

import { Fabric } from './Fabric'

export function HookFabric<T>(model: Fabric<T>, initialValue: T) {
  return function useHook(): [T, typeof model.next] {
    const [state, set] = useState<T>(initialValue)

    useEffect(() => {
      const subscribed = model.observable.subscribe({
        next(value) {
          set(value)
        }
      })

      return () => subscribed.unsubscribe()
    }, [])

    const setUser = model.next.bind(model)

    return [state, setUser]
  }
}
