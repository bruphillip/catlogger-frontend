import { FormEventHandler } from 'react'

interface _LoginProps {
  children: React.ReactElement
  onSubmit: FormEventHandler<HTMLFormElement>
}

function _Login({ children, onSubmit }: _LoginProps) {
  return (
    <div className="w-screen h-screen	flex justify-center items-center antialiased">
      <form
        className="p-10 h-fit w-96 bg-slate-600 rounded flex justify-center items-center flex-col gap-5 drop-shadow"
        onSubmit={onSubmit}
      >
        <h1 className="font-sans text-2xl underline-offset-1  antialiased font-semibold">
          Catlogger
        </h1>
        {children}
      </form>
    </div>
  )
}

export default _Login
