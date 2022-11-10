import { useMemo } from 'react'

import { userStore } from 'store/modules/user'

import { HydrateModule } from './Hydrate'

interface HydrateProviderProps {
  children: React.ReactElement
}

export function HydrateProvider({ children }: HydrateProviderProps) {
  const isHydrated = useMemo(() => {
    const hydration = new HydrateModule()
    hydration.setup([userStore])

    return true
  }, [])

  return isHydrated ? children : <div />
}
