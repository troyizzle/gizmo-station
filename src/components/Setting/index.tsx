import { useState } from "react"
import Button from "../Button"
import Modal from "../Modal"

export default function Setting() {
  const [isOpen, setIsOpen] = useState(true)

  return (
  <>
    <Button
    onClick={() => setIsOpen(true)}
    name="Settings"
    />
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}/>
    </>
  )
}
