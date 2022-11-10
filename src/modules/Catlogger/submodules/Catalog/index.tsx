import { useMemo } from 'react'
import { Transition, config } from 'react-spring'

import { Loading } from 'components/Loading'
import route from 'constants/route'
import { filterData } from 'provider/filterData'
import { RouterBuilder } from 'provider/router/RouterBuilder'
import { useBookRepository } from 'repositories/book/bookRepository'
import { BookProps } from 'repositories/book/types'
import { useStoreSearch } from 'store/modules/search'

import CardItem from './components/CardItem'

function Catalog() {
  const [books, _, { isLoading }] = useBookRepository<'all'>('all', {
    sort: 'asc'
  })
  const [{ search }] = useStoreSearch()

  const list = useMemo(
    () =>
      filterData(books, ['author', 'name', 'publisher.name'] as any, search),
    [search, books]
  ) as BookProps[]

  return (
    <div className="p-2 grid flex-1 grid-flow-row-dense grid-cols-6 gap-4 scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100">
      {isLoading && (
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
          <Loading color="hsl(var(--p))" />
        </div>
      )}
      <Transition
        keys={(book: any) => book.id}
        items={list}
        from={{ opacity: 0 }}
        enter={{ opacity: 1 }}
        leave={{ opacity: 0 }}
        trail={0}
        delay={0}
        config={config.gentle}
        expires={-20}
      >
        {({ opacity }, book) => (
          <CardItem key={book.id} opacity={opacity} book={book} />
        )}
      </Transition>
    </div>
  )
}

export default RouterBuilder(Catalog, route.CATLOGGER.SUBROUTES.CATALOG, [])
