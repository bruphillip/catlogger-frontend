import { useState } from 'react'
import { toast } from 'react-toastify'

import { userRepository } from 'repositories'
import { VolumeProps } from 'repositories/book/types'

interface VolumeItemProps {
  volume: VolumeProps
  height?: string
}

function VolumeItem({ volume, height }: VolumeItemProps) {
  const [isChecked, setIsChecked] = useState(volume?.checked || false)

  const outlineCheckedStyle = isChecked ? 'outline-success' : 'outline-white'
  const outlineWidthtCheckedStyle = isChecked ? 'outline-6' : 'outline-1'
  const bgColorCheckedStyle = isChecked ? 'bg-success-content' : 'bg-slate-900'
  const heightStyle = height || 400

  async function handleClick() {
    try {
      await userRepository.toogleVolume(volume?.id)
      setIsChecked(checked => !checked)
      toast.success('Salvo!')
    } catch (err) {
      toast.error('Ocorreu um problema')
    }
  }

  return (
    <button onClick={handleClick} type="button">
      <div
        className={`d-card w-[${heightStyle}] ${bgColorCheckedStyle} shadow-xl transition-all outline ${outlineCheckedStyle} ${outlineWidthtCheckedStyle} outline-offset-1`}
      >
        <img
          className="w-full h-96"
          src={volume?.coverUrl}
          alt={volume?.number}
        />
        <div className="d-card-body flex justify-start items-start">
          <h2 className="d-card-title">{volume?.number}</h2>
          <p className="truncate line overflow-hidden">{volume?.price}</p>
          <p className="truncate line overflow-hidden">{volume?.releaseDate}</p>
        </div>
      </div>
    </button>
  )
}

export default VolumeItem
