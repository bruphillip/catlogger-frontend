import { Outlet } from 'react-router'

import { Topbar } from 'components/Topbar'
import route from 'constants/route'
import { RouterBuilder } from 'provider/router/RouterBuilder'
import { userRepository } from 'repositories'
import { userStore } from 'store'

import Authors from './submodules/Authors'
import Book from './submodules/Book'
import Catalog from './submodules/Catalog'
import Config from './submodules/Config'
import MyList from './submodules/MyList'
import Publishers from './submodules/Publishers'

function CatLogger() {
  return (
    <div className="w-screen h-screen max-h-screen flex flex-1 flex-col">
      <Topbar />

      <div className="overflow-auto overscroll-contain my-5 h-screen">
        <div className="mx-5 ">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default RouterBuilder(
  CatLogger,
  route.CATLOGGER.BASE,
  [Catalog, MyList, Authors, Publishers, Book, Config],
  async ({ nav }) => {
    const { token } = userStore.data
    if (token === '') {
      nav(route.LOGIN.BASE[0])
    }
    const user = await userRepository.me()
    userStore.next(user)
  }
)
