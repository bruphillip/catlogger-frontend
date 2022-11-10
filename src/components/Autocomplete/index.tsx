import { useEffect, useMemo, useRef, useState } from 'react'

import { filterData } from 'provider/filterData'
import { useDebounced } from 'provider/useDebounced'
import { useInsideClick } from 'provider/useInsideClick'

import { Option } from './components/Option'

interface Options {
  url: string
  id: string
  name: string
}

export interface handleSelectProps {
  id: string
  name: string
  url: string
}

interface AutocompleteProps {
  opts: Options[]
  label: string
  handleSelect({ id, name, url }: handleSelectProps): void
}

export function Autocomplete({
  label = 'Autocomplete',
  opts,
  handleSelect
}: AutocompleteProps) {
  const { isInside, ref } = useInsideClick()
  const [current, setCurrent] = useState('')
  const handleSelectDebounced = useDebounced(handleSelect, 500)

  const listRef = useRef<HTMLDivElement>(null)

  function handleChange(option: Options) {
    if (current === option.name) return
    setCurrent(option.name)
    handleSelectDebounced(option)
  }

  const filtered = useMemo(
    () => filterData(opts, ['name'], current) || [],
    [opts, current]
  )

  useEffect(() => {
    if (
      filtered.length === 1 &&
      filtered[0].name.toLowerCase().includes(current.toLowerCase())
    )
      handleSelectDebounced(filtered[0])
  }, [filtered])

  const stylesHeight = isInside
    ? `h-[${listRef.current?.offsetHeight}px]`
    : 'h-14'

  return (
    <div
      className=" relative flex flex-col items-center gap-2 w-full antialiased h-12"
      ref={ref}
    >
      <div
        className={`
          opacity-100 w-full z-50
          absolute top-0 left-0
          bg-inherit flex flex-col 
          ${stylesHeight} max-h-[450px]
          rounded
          overflow-hidden
          transition-all ease-in duration-300`}
      >
        <div className="d-input-group p-2 relative w-full">
          <input
            type="text"
            onChange={({ target: { value } }) => {
              if (value === '')
                handleSelectDebounced({ id: '', name: '', url: '' })

              setCurrent(value)
            }}
            value={current}
            placeholder={label}
            className="d-input d-input-bordered d-input-primary  w-full"
          />
        </div>

        <div
          ref={listRef}
          className="overflow-auto opacity-100 bg-slate-500 w-full"
        >
          {filtered.map(opt => (
            <Option key={opt.id} handleClick={handleChange} option={opt} />
          ))}
        </div>
      </div>
    </div>
  )
}
