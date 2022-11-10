import { BookProps } from 'repositories/book/types'

export interface PublisherProps {
  id: string
  name: string
  books: BookProps[]
}
