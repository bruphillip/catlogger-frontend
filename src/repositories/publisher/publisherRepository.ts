import { HookRepository } from 'repositories/config/hook'
import { Repository } from 'repositories/config/repository'

import { PublisherProps } from './types'

// interface BookRepositoryProps {
//   myBooks: undefined
// }

class PublisherRepository extends Repository {
  async myBooks() {
    const response = await this.axios.get<PublisherProps[]>(
      this.base.PUBLISHER.GET.MY_BOOKS
    )

    return response.data
  }
}

export const publisherRepository = new PublisherRepository()

export const usePublisherRepository = HookRepository(publisherRepository)
