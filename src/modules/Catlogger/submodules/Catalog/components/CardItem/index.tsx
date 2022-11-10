import { NavLink } from 'react-router-dom'
import { animated } from 'react-spring'

import route from 'constants/route'
import { BookProps } from 'repositories/book/types'

interface CartItemProps {
  book: BookProps
  opacity: number
}

function CardItem({ book, opacity }: CartItemProps) {
  return (
    <animated.div style={{ opacity }}>
      <NavLink to={route.CATLOGGER.SUBROUTES.BOOK.replace(':bookId', book.id)}>
        <div className="d-card w-[400] bg-slate-900 shadow-xl outline outline-white outline-offset-1 outline-1  ">
          <img
            className="w-full h-96"
            src={book?.volumes[0]?.coverUrl}
            alt={book.name}
          />
          <div className="d-card-body">
            <h2
              className="d-card-title truncate line overflow-hidden"
              title={book.name}
            >
              {book.name}
            </h2>
            <p className="truncate line overflow-hidden" title={book.author}>
              {book.author}
            </p>
            <p>{book.publisher.name}</p>
          </div>
        </div>
      </NavLink>
    </animated.div>
  )
}

export default CardItem
