export default {
  PREFIX: 'JWT',
  BASE: `http://localhost:3003`,
  USER: {
    POST: {
      LOGIN: 'user/login',
      CREATE: 'user',
      TOOGLE_VOLUME: 'user/volume/:volumeId',
      TOOGLE_LIKE: 'user/like/:bookId'
    },
    GET: {
      ID: `user/id/:id`,
      ME: 'user/me'
    }
  },
  BOOK: {
    POST: {
      SAVE: 'book'
    },
    GET: {
      ALL: 'book/all',
      ID: 'book/:id',
      ID_VOLUMES: 'book/:id/volumes'
    }
  },
  PUBLISHER: {
    GET: {
      MY_BOOKS: '/publisher/mybooks'
    }
  }
} as const
