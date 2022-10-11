import Draggable from "react-draggable";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export default function() {
  const [widget, setWidget] = useLocalStorage<{x: 0, y: 0}>("widget", {x: 0, y: 0});
  const eventHandler = (e: any, data: any) => {
    console.log('Event Type', e.type);
    console.log({e, data});
    const widgetPos = { x: data.x, y: data.y }
    setWidget(widgetPos)
  }

  return(
  <Draggable
    defaultPosition={{x: widget.x, y: widget.y}}
    onStop={eventHandler}
  >
  <div className="h-64 w-64 bg-gray-300">this is a drag</div>
  </Draggable>
  )
}
