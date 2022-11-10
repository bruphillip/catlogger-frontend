import { useFieldArray, useFormContext } from 'react-hook-form'
import { FaTrash } from 'react-icons/fa'
import { FiExternalLink } from 'react-icons/fi'

export function ArrayForm() {
  const { watch, register, control } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'volumes'
  })

  return (
    <>
      <div className="flex flex-1 w-full gap-8">
        <button
          onClick={() => {
            append(
              { number: '', price: '', releaseDate: '', coverUrl: '' },
              { shouldFocus: true }
            )
          }}
          type="button"
          className="d-btn d-btn-square d-btn-outline d-btn-primary w-32 text-white"
        >
          Adicionar
        </button>
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="flex flex-1 flex-row w-full">
          <div className="d-form-control p-2">
            <div className="d-label">
              <span className="text-base d-label-text">Del.</span>
            </div>
            <button
              onClick={() => remove(index)}
              type="button"
              className="d-btn d-btn-square d-btn-outline d-btn-error w-16 text-white my-auto"
            >
              <FaTrash size={20} />
            </button>
          </div>

          <div className="d-form-control p-2 w-full">
            <div className="d-label">
              <span className="text-base d-label-text">No. Vol</span>
            </div>
            <input
              id="number"
              type="text"
              placeholder="Número"
              className="d-input d-input-bordered d-input-primary"
              {...register(`volumes.${index}.number`)}
            />
          </div>

          <div className="d-form-control p-2 w-full">
            <div className="d-label">
              <span className="text-base d-label-text">Preço</span>
            </div>
            <input
              id="price"
              type="text"
              placeholder="Preço"
              className="d-input d-input-bordered d-input-primary"
              {...register(`volumes.${index}.price`)}
            />
          </div>

          <div className="d-form-control p-2 w-full">
            <div className="d-label">
              <span className="text-base d-label-text">Data de Lançamento</span>
            </div>
            <input
              id="releaseDate"
              type="text"
              placeholder="Data de Lançamento"
              className="d-input d-input-bordered d-input-primary"
              {...register(`volumes.${index}.releaseDate`)}
            />
          </div>

          <div className="d-form-control p-2 w-full relative">
            <div className="d-label">
              <span className="text-base d-label-text">Capa</span>
            </div>
            <input
              id="coverUrl"
              type="text"
              placeholder="Capa"
              className="d-input d-input-bordered d-input-primary pr-14"
              {...register(`volumes.${index}.coverUrl`)}
            />

            <a
              className="absolute right-6 bottom-6"
              href={watch(`volumes.${index}.coverUrl`)}
              target="_blank"
              rel="noreferrer"
            >
              <FiExternalLink size={20} />
            </a>
          </div>
        </div>
      ))}
    </>
  )
}
