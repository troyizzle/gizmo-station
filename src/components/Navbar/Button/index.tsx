type NavbarButtonProps = {
  name: string
  onClick: any
}

export default function NavbarButton({ name, onClick }: NavbarButtonProps) {
  const menuButtonStyling = "rounded-md text-white font-medium bg-purple-500 py-2 px-3 hover:bg-purple-300";

  return (
    <button
    type="button"
    onClick={onClick}
    className={menuButtonStyling}>
      {name}
    </button>
  )
}
