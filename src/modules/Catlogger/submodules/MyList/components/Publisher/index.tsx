import { useMemo, useState } from 'react'
import { FiExternalLink } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'

import { Dragscroll } from 'components/Dragscroll'
import route from 'constants/route'
import { flatMapDeep } from 'lodash'
import { filterData } from 'provider/filterData'
import { PublisherProps } from 'repositories/publisher/types'
import { useStoreSearch } from 'store/modules/search'

import { Volume } from '../Volumes'

interface PublisherComponentProps {
  publishers?: PublisherProps[]
}

export function Publisher({ publishers }: PublisherComponentProps) {
  const [onlyChecked, setOnlyChecked] = useState(false)
  const [{ search }] = useStoreSearch()

  const filtered = useMemo(() => {
    const booksFiltered = publishers?.map(publisher => ({
      ...publisher,
      books: filterData(publisher.books, ['name', 'author'], search)
    }))

    const publisherFiltered = publishers
      ?.filter(publisher => {
        const hasMatch = publisher.name
          .toLowerCase()
          .includes(search.toLowerCase())

        if (hasMatch) {
          return true
        }
        if (
          booksFiltered?.some(
            publisherBook =>
              publisherBook.id === publisher.id &&
              (publisherBook?.books || []).length > 0
          )
        ) {
          return true
        }
        return false
      })
      .map(publisher => {
        const books = booksFiltered?.find(
          publisherBook => publisherBook.id === publisher.id
        )?.books

        if ((books || [])?.length > 0) {
          return {
            ...publisher,
            books
          }
        }

        return publisher
      })

    return publisherFiltered || publishers
  }, [search, publishers])

  function counter(object: any) {
    const volumes = flatMapDeep(object.books, book => book.volumes)
    const own = volumes.filter(volume => volume.checked)?.length
    return {
      total: volumes?.length || 0,
      own
    }
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="d-form-control self-end">
        <label className="d-label cursor-pointer" htmlFor="show1">
          <span className="d-label-text mr-1">Somente adquiridos</span>
          <input
            id="show"
            type="checkbox"
            defaultChecked={onlyChecked}
            onClick={() => setOnlyChecked(checked => !checked)}
            className="d-checkbox d-checkbox-primary"
          />
        </label>
      </div>
      {filtered?.map((publisher, index) => (
        <div key={publisher.id}>
          <div className="w-full d-stats d-stats-vertical shadow outline outline-accent outline-1 outline-offset-1">
            <div className="self-start">
              <div className="d-stat">
                <div className="d-stat-title text-2xl">{publisher.name}</div>
                <div className="d-stat-value text-primary">
                  {counter(publisher).own}/{counter(publisher).total}
                </div>
                <div className="d-stat-desc">Volumes</div>
              </div>
            </div>

            {publisher?.books?.map(book => (
              <div key={book.id} className="d-stat">
                <div className="self-start">
                  <div className="font-bold text-4xl d-stat-title text-secondary flex flex-row gap-2 items-center">
                    <NavLink
                      to={`../${route.CATLOGGER.SUBROUTES.BOOK.replace(
                        ':bookId',
                        book.id
                      )}`}
                    >
                      {book.name}
                    </NavLink>
                    <a href={book.url} target="_blank" rel="noreferrer">
                      <FiExternalLink />
                    </a>
                  </div>
                  <div className="d-stat-value font-thin ">
                    <span className="text-accent font-bold">
                      {book.volumes.filter(volume => volume?.checked)?.length}
                    </span>
                    /<span>{book.volumes?.length}</span>
                  </div>
                </div>
                <Dragscroll>
                  <div className="d-stat flex flex-row">
                    {book.volumes
                      .filter(volume => (onlyChecked ? volume?.checked : true))
                      .map(volume => (
                        <Volume key={volume.id} volume={volume} />
                      ))}
                  </div>
                </Dragscroll>
              </div>
            ))}
          </div>
          {filtered[index + 1]?.id && (
            <div className="divider w-full h-px bg-white/20 mt-6" />
          )}
        </div>
      ))}
    </div>
  )
}
