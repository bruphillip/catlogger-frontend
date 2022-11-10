import { toast } from 'react-toastify'

import route from 'constants/route'
import { navigate } from 'provider/router/navigate'
import { VolumeProps } from 'repositories/book/types'
import { Repository } from 'repositories/config/repository'
import { userStore } from 'store'

type LoginProps = { email: string; password: string }
type CreateProps = { name: string; email: string; password: string }
export type BaseUserReturn = {
  id: string
  name: string
  email: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  volumes?: VolumeProps[]
}
type LoginReturn = BaseUserReturn & {
  token: string
}

class UserRepository extends Repository {
  async login({ email, password }: LoginProps): Promise<LoginReturn> {
    try {
      const response = await this.axios.post<LoginReturn>(
        this.base.USER.POST.LOGIN,
        { email, password }
      )

      userStore.next(response.data)

      this.setToken()

      navigate.go('/catlogger')

      return response.data
    } catch (err) {
      toast.error('Login invalido')
      throw err
    }
  }

  async create({
    name,
    email,
    password
  }: CreateProps): Promise<BaseUserReturn> {
    try {
      const response = await this.axios.post<BaseUserReturn>(
        this.base.USER.POST.CREATE,
        { name, email, password }
      )

      toast.success('User criado com sucesso!')

      navigate.go(route.LOGIN.BASE[0])

      return response.data
    } catch (err) {
      toast.error('Erro ao criar usuario')
      throw err
    }
  }

  async me(): Promise<BaseUserReturn> {
    const response = await this.axios.get<BaseUserReturn>(this.base.USER.GET.ME)

    return response.data
  }

  async toogleVolume(volumeId: string) {
    const response = await this.axios.post(
      this.base.USER.POST.TOOGLE_VOLUME.replace(':volumeId', volumeId)
    )

    return response.data
  }

  async toogleLike(bookId: string) {
    const response = await this.axios.post(
      this.base.USER.POST.TOOGLE_LIKE.replace(':bookId', bookId)
    )

    return response.data
  }
}

export const userRepository = new UserRepository()
