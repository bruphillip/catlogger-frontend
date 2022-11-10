import { useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FiExternalLink } from 'react-icons/fi'
import { toast } from 'react-toastify'

import { Autocomplete, handleSelectProps } from 'components/Autocomplete'
import link from 'constants/link'
import { pickBy } from 'lodash'
import { bookRepository } from 'repositories/book/bookRepository'
import { BookProps, VolumeProps } from 'repositories/book/types'

import { ArrayForm } from '../ArrayForm'

interface ConfigFormProps {
  books: BookProps[]
}

const initialForm = {
  name: '',
  author: '',
  url: '',
  id: '',
  volumes: [] as VolumeProps[]
} as BookProps

export function ConfigForm({ books }: ConfigFormProps) {
  const opts = useMemo(
    () =>
      books?.map(book => ({
        id: book.id,
        name: book.name,
        url: book.volumes[0].coverUrl
      })),
    [books]
  )

  const formMethods = useForm({ defaultValues: initialForm })

  const { register, reset, watch, handleSubmit } = formMethods

  async function handleSelect({ id }: handleSelectProps) {
    let book = initialForm
    if (id) book = await bookRepository.byIdWithVolumes({ id })
    reset(book)
  }

  async function save(book: BookProps) {
    const updated = await bookRepository.save(pickBy(book, key => key !== ''))
    toast.success('Atualizado com sucesso!')
    reset(updated)
  }

  const onSubmit = handleSubmit(save)

  const currentUrl = watch('volumes.0.coverUrl') || link.QUESTION_FACE

  return (
    <FormProvider {...formMethods}>
      <img
        src={currentUrl}
        alt="Cover"
        className="max-w-sm rounded-lg shadow-2xl w-96 h-[400px]"
      />
      <form className="w-full" onSubmit={onSubmit}>
        <h1 className="text-5xl font-bold">Criação / Edição</h1>

        <div className="d-form-control">
          <div className="d-label">
            <span className="text-base d-label-text">
              Quer editar? Selecione o manga
            </span>
          </div>
          <div className="w-full">
            <Autocomplete
              label="Lista de mangas"
              opts={opts || []}
              handleSelect={handleSelect}
            />
          </div>
        </div>

        <div className="flex flex-1 flex-row">
          <div className="d-form-control p-2 flex flex-1">
            <div className="d-label">
              <span className="text-base d-label-text">Nome</span>
            </div>
            <input
              id="name"
              type="text"
              placeholder="Nome"
              className="d-input d-input-bordered d-input-primary"
              {...register('name')}
            />
          </div>

          <div className="d-form-control p-2 flex flex-1">
            <div className="d-label">
              <span className="text-base d-label-text">Autor</span>
            </div>
            <input
              id="author"
              type="text"
              placeholder="Autor"
              className="d-input d-input-bordered d-input-primary"
              {...register('author')}
            />
          </div>
        </div>

        <div className="flex flex-1 flex-row">
          <div className="d-form-control p-2 flex flex-1">
            <div className="d-label">
              <span className="text-base d-label-text">Editora</span>
            </div>
            <input
              id="publisher"
              type="text"
              placeholder="Editora"
              className="d-input d-input-bordered d-input-primary"
              {...register('publisher.name')}
            />
          </div>

          <div className="d-form-control p-2 relative z-10 flex flex-1">
            <div className="d-label">
              <span className="text-base d-label-text">
                Link para página do manga
              </span>
            </div>
            <input
              id="url"
              type="text"
              placeholder="Url"
              className="d-input d-input-bordered d-input-primary"
              {...register('url')}
            />
            <a
              className="absolute right-6 bottom-6"
              href={watch('url')}
              target="_blank"
              rel="noreferrer"
            >
              <FiExternalLink size={20} />
            </a>
          </div>
        </div>

        <div className="d-form-control p-2 h-[600px] w-full">
          <div className="d-label">
            <span className="text-xl d-label-text">Volumes</span>
          </div>

          <div className="grid grid-flow-row-dense gap-4 self-center overflow-auto w-full">
            <ArrayForm />
          </div>

          <button type="submit" className="d-btn d-btn-primary mt-4">
            Salvar
          </button>
        </div>
      </form>
    </FormProvider>
  )
}
