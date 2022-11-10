import { Loading } from 'components/Loading'
import route from 'constants/route'
import { RouterBuilder } from 'provider/router/RouterBuilder'
import { usePublisherRepository } from 'repositories/publisher/publisherRepository'

import { Publisher } from './components/Publisher'

function Catalog() {
  const [publishers, _, { isLoading }] = usePublisherRepository('myBooks')

  return (
    <div className="p-2 flex flex-1">
      {isLoading && (
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
          <Loading color="hsl(var(--p))" />
        </div>
      )}
      <Publisher publishers={publishers} />
    </div>
  )
}

export default RouterBuilder(Catalog, route.CATLOGGER.SUBROUTES.MYLIST, [])
