import { useEffect, useRef, useState } from 'react'

export function useInsideClick() {
  const ref = useRef<any>(null)
  const [isInside, setIsInside] = useState(false)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as any)) {
        setIsInside(false)
        return
      }

      setIsInside(true)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return { ref, isInside }
}
