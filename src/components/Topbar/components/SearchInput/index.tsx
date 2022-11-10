import { useEffect, useMemo, useRef, useState } from 'react'
import { MdSearch } from 'react-icons/md'
import { useLocation } from 'react-router'

import route from 'constants/route'
import { debounce } from 'lodash'
import { useStoreSearch } from 'store/modules/search'

export function SearchInput() {
  const [_, setSearch] = useStoreSearch()
  const [inputValue, setInputValue] = useState('')
  const { pathname } = useLocation()
  const inputRef = useRef<HTMLInputElement>(null)

  const setDebounced = useMemo(() => debounce(setSearch, 200), [])

  useEffect(() => {
    if (
      pathname.includes(route.CATLOGGER.SUBROUTES.BOOK.replace(':bookId', ''))
    ) {
      return
    }
    setInputValue('')
    setSearch({ search: '' })
  }, [pathname])

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>): void {
    setInputValue(event?.target.value)
    setDebounced({ search: event?.target.value })
  }

  return (
    <div className="ml-10 self-center relative d-form-control flex flex-row items-center gap-2 w-2/5 rounded px-3 antialiased h-12">
      <div
        className={`
          absolute top-0 left-0
          bg-base-100 flex flex-col w-full
          h-12 max-h-[300px]
          rounded-lg 
          transition-all ease-in duration-300
          outline outline-white/20 outline-offset-1 outline-1`}
      >
        <div className="d-input-group">
          <button type="button" className="d-btn d-btn-square">
            <MdSearch className="fill-white" size={25} />
          </button>
          <input
            ref={inputRef}
            value={inputValue}
            onChange={handleSearch}
            className=" w-full d-input d-input-ghost "
            type="text"
            placeholder="Buscar por (manga/editora/autor)"
          />
        </div>
        {/* <div className="bg-base-300 overflow-auto ">
          <div>100% morango</div>
          <div>100% morango</div>
          <div>100% morango</div>
        </div> */}
      </div>
    </div>
  )
}
