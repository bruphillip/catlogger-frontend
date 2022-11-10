import { useRef } from 'react'

import { debounce } from 'lodash'

export function useDebounced(func: any, timer: number) {
  const debounced = useRef(debounce(func, timer))

  return debounced.current
}
