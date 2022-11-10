import { useEffect, useState } from 'react'
import { AiOutlineHeart, AiFillHeart, AiOutlineArrowLeft } from 'react-icons/ai'
import { FiExternalLink } from 'react-icons/fi'
import { useNavigate, useParams } from 'react-router'

import { Loading } from 'components/Loading'
import route from 'constants/route'
import { RouterBuilder } from 'provider/router/RouterBuilder'
import { userRepository } from 'repositories'
import { useBookRepository } from 'repositories/book/bookRepository'

import VolumeItem from './components/VolumeItem'

function Book() {
  const navigate = useNavigate()

  const { bookId } = useParams<{ bookId: string }>()

  const [book, _] = useBookRepository<'byIdWithVolumes'>('byIdWithVolumes', {
    id: bookId || ''
  })

  const [liked, setLiked] = useState(false)

  useEffect(() => {
    setLiked((book as any)?.liked.length > 0)
  }, [book])

  async function toogleLike() {
    await userRepository.toogleLike((book as any)?.id)
    setLiked(like => !like)
  }

  if (!book)
    return (
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
        <Loading color="hsl(var(--p))" />
      </div>
    )

  return (
    <div className="p-2">
      <div className="d-hero min-h-full bg-base-200 justify-start">
        <div className="flex flex-col">
          <div className="p-4">
            <button
              onClick={() => navigate(-1)}
              type="button"
              className="d-btn"
            >
              <AiOutlineArrowLeft size={30} />
            </button>
          </div>
          <div className="d-hero-content">
            <img
              src={book?.volumes[0].coverUrl}
              className="max-w-sm rounded-lg shadow-2xl"
              alt=""
            />
            <div>
              <h1 className="text-5xl font-bold flex flex-row">
                {book?.name}{' '}
                <a href={book.url} target="_blank" rel="noreferrer">
                  <FiExternalLink />
                </a>
              </h1>
              <p className="py-2">{book?.author}</p>
              <p className="py-2">{book?.publisher.name}</p>
              <p className="py-2">{book?.numberOfVolumes}</p>
              <button
                type="button"
                className="d-btn d-btn-primary"
                onClick={toogleLike}
              >
                {liked ? (
                  <AiFillHeart size={20} />
                ) : (
                  <AiOutlineHeart size={20} />
                )}
              </button>
            </div>
          </div>
          <div className="p-10 grid flex-1 grid-flow-row-dense grid-cols-7 gap-4 self-center ">
            {book?.volumes.map(volume => (
              <VolumeItem key={volume.id} volume={volume} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RouterBuilder(Book, route.CATLOGGER.SUBROUTES.BOOK, [])
