import { useMemo, useState } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa'

interface InputProps {
  register: UseFormRegister<any>
  error?: string
  type: string
  field: string
  placeholder: string
}

export function Input({
  register,
  error,
  type = 'text',
  field,
  placeholder
}: InputProps) {
  const isPassword = useMemo(() => type === 'password', [])
  const [hide, setHide] = useState(true)

  return (
    <div className="w-full max-w-xs">
      <div className="relative">
        <input
          {...register(field)}
          className={`d-input d-input-ghost w-full max-w-xs `.concat(
            error ? 'd-input-error' : ''
          )}
          placeholder={placeholder}
          type={hide ? type : 'text'}
        />
        {isPassword && (
          <button
            type="button"
            title="Mostrar senha"
            className="d-btn d-btn-ghost absolute right-0 top-0"
            onClick={() => setHide(hidden => !hidden)}
          >
            {hide ? <FaRegEyeSlash size={15} /> : <FaRegEye size={15} />}
          </button>
        )}
      </div>
      <span className="mx-2 text-error">{error}</span>
    </div>
  )
}
