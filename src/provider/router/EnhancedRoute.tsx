import { useCallback, useEffect } from 'react'
import { NavigateFunction, useNavigate } from 'react-router'

import { navigate } from './navigate'

type ActionsProp = ({ nav }: { nav: NavigateFunction }) => void | Promise<void>

export type EnchancedRouterProps = {
  actions?: ActionsProp
  children: React.ReactElement
}

export function EnhancedRouter({ actions, children }: EnchancedRouterProps) {
  const nav = useNavigate()

  const callbackHook = useCallback(async () => {
    if (!actions) return

    const callback = actions({ nav })

    if (callback?.then) {
      await callback
    }
  }, [nav])

  useEffect(() => {
    callbackHook()
  }, [callbackHook])

  useEffect(() => {
    navigate.set(nav)
  }, [])

  return children
}
