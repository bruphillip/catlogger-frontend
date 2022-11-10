import { useLocation } from 'react-router'
import { NavLink } from 'react-router-dom'

import route from 'constants/route'

import { Avatar } from './components/Avatar'
import { SearchInput } from './components/SearchInput'

export function Topbar() {
  const params = useLocation()

  const currentRoute = params.pathname
    .replace(route.CATLOGGER.BASE, '')
    .replace('/', '')

  const isBaseActive = currentRoute === ''
  const isMyListActive = currentRoute === route.CATLOGGER.SUBROUTES.MYLIST

  function isActiveClass(isActive: boolean) {
    return isActive ? 'text-accent italic scale-105' : 'text-white'
  }

  return (
    <div className="bg-slate-800 p-6 h-20 mb-5 flex flex-row items-center  gap-10 text-xl tracking-wide font-medium leading-loose	z-10">
      <NavLink
        to={route.CATLOGGER.BASE}
        className={`${isActiveClass(isBaseActive)} hover:scale-105`}
      >
        Inicio
      </NavLink>
      <NavLink
        to={route.CATLOGGER.SUBROUTES.MYLIST}
        className={`${isActiveClass(isMyListActive)} hover:scale-105`}
      >
        Meus Mangas
      </NavLink>

      <SearchInput />

      <Avatar />
    </div>
  )
}
