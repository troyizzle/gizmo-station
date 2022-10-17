import { useState } from "react";
import Button from "../Button";
import WidgetModal from "./Modal";

export default function WidgetMenu() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)} name="Widget" />
      <WidgetModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
