import { useState } from "react"
import Modal from "../Modal"
import NavbarButton from "../Navbar/Button"

export default function Setting() {
  const [isOpen, setIsOpen] = useState(false)

  return (
  <>
    <NavbarButton
    onClick={() => setIsOpen(true)}
    name="Settings"
    />
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}
