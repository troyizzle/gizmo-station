import clsx from "clsx"

type ButtonProps = {
  name: string
  onClick?: any
  wide?: boolean
}

export default function Button({ name, onClick, wide = false }: ButtonProps) {
  const styling = clsx("rounded-md text-white font-medium bg-purple-600 py-2 px-3 hover:bg-purple-500",
  {['w-full']: wide })

  return (
    <button
    type="button"
    onClick={onClick}
    className={styling}>
      {name}
    </button>
  )
}
