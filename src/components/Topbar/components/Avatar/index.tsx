import { NavLink } from 'react-router-dom'

import route from 'constants/route'
import { navigate } from 'provider/router/navigate'
import { useInsideClick } from 'provider/useInsideClick'
import { useStoreUser } from 'store'

export function Avatar() {
  const avatarUrl =
    'https://i.pinimg.com/564x/be/2a/4b/be2a4b7e8cb0170ffd46a20a110f166b.jpg'

  const { isInside, ref } = useInsideClick()

  const [_, setUser] = useStoreUser()

  function handleLogout() {
    setUser({ token: '' })
    navigate.go('/')
  }

  return (
    <div
      ref={ref}
      className="ml-auto self-center relative d-form-control flex flex-row items-center gap-2 rounded px-3 antialiased h-12"
    >
      <button type="button" className="d-avatar">
        <div
          className={`h-12 rounded-full ring hover:ring-primary ${
            isInside ? 'ring-primary' : ''
          } ring-offset-base-100 ring-offset-2`}
        >
          <img src={avatarUrl} alt="Avatar" />
        </div>
      </button>

      {isInside && (
        <ul className="absolute right-0 top-14 d-menu d-menu-normal bg-base-100 w-56 rounded-box ring ring-primary ring-offset-secondary ring-offset-3 ">
          <li>
            <NavLink to={route.CATLOGGER.SUBROUTES.CONFIG}>
              Configuracoes
            </NavLink>
          </li>
          <li>
            <a href="/#">Editar</a>
          </li>
          <li>
            <button onClick={handleLogout} type="button">
              Sair
            </button>
          </li>
        </ul>
      )}
    </div>
  )
}
