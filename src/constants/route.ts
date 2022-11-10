export default {
  LOGIN: {
    BASE: ['/', 'login']
  },
  CREATE_USER: {
    BASE: '/create'
  },
  CATLOGGER: {
    BASE: '/catlogger',
    SUBROUTES: {
      CATALOG: ['', 'catalog'],
      MYLIST: 'my-list',
      PUBLISHERS: 'publishers',
      AUTHORS: 'authors',
      CONFIG: 'config',
      BOOK: 'book/:bookId'
    }
  }
}
