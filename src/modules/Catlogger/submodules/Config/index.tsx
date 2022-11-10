import { Loading } from 'components/Loading'
// import link from 'constants/link'
import route from 'constants/route'
import { RouterBuilder } from 'provider/router/RouterBuilder'
import { useBookRepository } from 'repositories/book/bookRepository'

import { ConfigForm } from './components/Form'

function Config() {
  const [books, _, { isLoading }] = useBookRepository<'all'>('all', {
    sort: 'asc'
  })

  if (isLoading)
    return (
      <div className="my-5 h-96 bg-slate-600 rounded-xl flex items-center justify-center">
        <Loading />
      </div>
    )

  return (
    <div className="flex justify-start items-start">
      <div className="d-hero place-items-start bg-slate-600 rounded-xl w-full">
        <div className="d-hero-content max-w-full flex-row justify-start items-start  w-full">
          <ConfigForm books={books} />
        </div>
      </div>
    </div>
  )
}

export default RouterBuilder(Config, route.CATLOGGER.SUBROUTES.CONFIG, [])
