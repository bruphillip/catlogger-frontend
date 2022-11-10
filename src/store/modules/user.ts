import { Fabric, HookFabric } from 'store/config'

interface IUser {
  token: string
  name: string
  email: string
  password: string
  id: string
}

export class User extends Fabric<IUser> {
  static initialValue: IUser = {
    id: '',
    name: '',
    password: '',
    email: '',
    token: ''
  }

  constructor() {
    super(User.initialValue)
  }
}

const userStore = new User()

const useStoreUser = HookFabric<IUser>(userStore, User.initialValue)

export { useStoreUser, userStore }
