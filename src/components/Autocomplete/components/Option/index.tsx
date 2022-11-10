interface OptionProps {
  option: { id: string; url: string; name: string }
  handleClick(name: any): void
}

export function Option({ option, handleClick }: OptionProps) {
  return (
    <button
      type="button"
      onClick={() => handleClick(option)}
      className="w-full rounded bg-base-300 overflow-auto flex flex-row gap-4 items-center py-5 px-3 hover:bg-primary/30 cursor-pointer"
    >
      <div className="d-avatar">
        <div className="h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src={option.url} alt="logo" />
        </div>
      </div>
      <span className="text-ellipsis overflow-hidden whitespace-nowrap">
        {option.name}
      </span>
    </button>
  )
}
