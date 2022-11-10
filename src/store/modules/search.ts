import { Fabric, HookFabric } from 'store/config'

interface SearchProps {
  search: string
}

export class Search extends Fabric<SearchProps> {
  static initialValue: SearchProps = {
    search: ''
  }

  constructor() {
    super(Search.initialValue)
  }
}

const searchStore = new Search()

const useStoreSearch = HookFabric<SearchProps>(searchStore, Search.initialValue)

export { useStoreSearch, searchStore }
