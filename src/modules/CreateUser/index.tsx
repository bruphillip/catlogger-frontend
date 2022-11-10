import { useForm } from 'react-hook-form'
import { NavLink } from 'react-router-dom'

import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from 'components/_Login/Input'
import Template from 'components/_Login/Template'
import route from 'constants/route'
import { RouterBuilder } from 'provider/router/RouterBuilder'
import { userRepository } from 'repositories'
import { userStore } from 'store'
import * as yup from 'yup'

type FormValues = {
  name: string
  email: string
  password: string
}

const schema = yupResolver(
  yup
    .object({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().min(6).required()
    })
    .required()
)

function createUser() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: schema
  })

  const onSubmit = handleSubmit(userRepository.create.bind(userRepository))

  return (
    <Template onSubmit={onSubmit}>
      <>
        <Input
          field="name"
          register={register}
          type="text"
          placeholder="Nome"
          error={errors.name?.message}
        />

        <Input
          field="email"
          register={register}
          type="text"
          placeholder="E-mail"
          error={errors.email?.message}
        />

        <Input
          field="password"
          register={register}
          type="password"
          placeholder="Senha"
          error={errors.password?.message}
        />

        <button
          className="d-btn-primary h-9 w-full max-w-xs rounded"
          type="submit"
        >
          Criar conta
        </button>
        <NavLink
          to="/"
          className="w-64 text-center d-btn-link text-white no-underline"
        >
          Voltar
        </NavLink>
      </>
    </Template>
  )
}

export default RouterBuilder(
  createUser,
  route.CREATE_USER.BASE,
  [],
  ({ nav }) => {
    if (userStore.data.token !== '') {
      nav(route.CATLOGGER.BASE)
    }
  }
)
