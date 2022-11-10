import { VolumeProps } from 'repositories/book/types'

interface IVolume {
  volume: VolumeProps
}

export function Volume({ volume }: IVolume) {
  const outlineCheckedStyle = volume?.checked
    ? 'outline-success'
    : 'outline-white'
  const outlineWidthtCheckedStyle = volume?.checked ? 'outline-6' : 'outline-1'
  const bgColorCheckedStyle = volume?.checked
    ? 'bg-success-content'
    : 'bg-slate-900'

  const opacityCheckedStyle = volume?.checked ? 'opacity-1' : 'opacity-40'

  return (
    <button type="button" className="" draggable={false}>
      <div
        className={`d-card w-40 ${bgColorCheckedStyle} ${opacityCheckedStyle} shadow-xl transition-all outline ${outlineCheckedStyle} ${outlineWidthtCheckedStyle} outline-offset-1`}
      >
        <img
          draggable={false}
          className="h-44 object-fill"
          src={volume?.coverUrl}
          alt={volume?.number}
        />
        <div className="d-card-body flex justify-start items-start">
          <h2 className="d-card-title">{volume?.number}</h2>
          <p className="truncate line overflow-hidden">{volume?.price}</p>
          <p
            className="truncate line overflow-hidden text-start"
            title={volume.releaseDate}
          >
            {volume?.releaseDate}
          </p>
        </div>
      </div>
    </button>
  )
}
