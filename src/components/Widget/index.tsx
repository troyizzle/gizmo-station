import Draggable from "react-draggable";
import { useWidgets, Widget } from "../../context/WidgetContext";
import Todo from "../Todo";

export default function WidgetComponent({ title, x, y }: Widget) {
  const { updateWidget } = useWidgets();

  const eventHandler = (_e: any, data: any) => {
    updateWidget(title, data.x, data.y);
  };

  return (
    <Draggable key={title} defaultPosition={{ x: x, y: y }} onStop={eventHandler}>
      <div className="p-2 mb-2 w-72 bg-gray-800 sm:w-96 max-w-sm shadow-md rounded-lg justify-between">
        <div className="flex justify-between items-center p-1 handle">
          <p className="text-white">{title}</p>
        </div>
        <Todo/>
      </div>
    </Draggable>
  );
}
