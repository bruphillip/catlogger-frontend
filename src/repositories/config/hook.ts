import { useCallback, useEffect, useState } from 'react'

import { StateProps, Props } from './type'

type NonNullable<T> = Exclude<T, null | undefined>

export function HookRepository<T>(repository: T) {
  return <K extends keyof T>(
    method: keyof T,
    params?: Props<T, K>
  ): [
    StateProps<T, K>,
    React.Dispatch<React.SetStateAction<StateProps<T, K> | undefined>>,
    { reload: () => void; isLoading: boolean }
  ] => {
    const [state, set] = useState<StateProps<T, K>>()
    const [isLoading, setIsLoading] = useState(true)

    const callback = useCallback(async () => {
      try {
        setIsLoading(true)
        const response = await (repository as any)[method](params)
        set(response)
      } finally {
        setIsLoading(false)
      }
    }, [method, params])

    useEffect(() => {
      callback()
    }, [])

    return [
      state as NonNullable<typeof state>,
      set,
      { reload: callback, isLoading }
    ]
  }
}
