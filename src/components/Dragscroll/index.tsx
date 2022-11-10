import { useRef } from 'react'

import { useDrag } from '@use-gesture/react'

interface DragscrollProps {
  children: React.ReactElement
}

export function Dragscroll({ children }: DragscrollProps) {
  const ref = useRef<HTMLDivElement>(null)

  const scroll = useDrag(handler => {
    const distance = {
      x: {
        change: (handler.distance[0] * -handler.direction[0]) / 100
      }
    }

    ref.current?.scrollBy({
      left: distance.x.change
    })
  })

  return (
    <div
      ref={ref}
      className="overflow-auto cursor-auto"
      {...scroll()}
      style={{ touchAction: 'pan-y' }}
    >
      {children}
    </div>
  )
}
