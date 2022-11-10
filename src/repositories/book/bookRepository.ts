import { HookRepository } from 'repositories/config/hook'
import { Repository } from 'repositories/config/repository'

import { BookProps } from './types'

interface BookRepositoryProps {
  all: { sort?: 'asc' | 'desc' }
  byIdWithVolumes: { id: string }
}

class BookRepository extends Repository {
  async all({ sort }: BookRepositoryProps['all']): Promise<BookProps[]> {
    const response = await this.axios.get<BookProps[]>(this.base.BOOK.GET.ALL, {
      params: {
        sort
      }
    })

    return response.data
  }

  async byIdWithVolumes({
    id
  }: BookRepositoryProps['byIdWithVolumes']): Promise<BookProps> {
    const response = await this.axios.get<BookProps>(
      this.base.BOOK.GET.ID_VOLUMES.replace(':id', id)
    )

    return response.data
  }

  async save(book: Partial<BookProps>) {
    const response = await this.axios.post<BookProps>(
      this.base.BOOK.POST.SAVE,
      book
    )

    return response.data
  }
}

export const bookRepository = new BookRepository()

export const useBookRepository = HookRepository(bookRepository)
