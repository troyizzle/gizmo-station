import { useWidgets } from "../../context/WidgetContext";
import Widget from "../Widget";

export default function Main() {
  const { widgets } = useWidgets()

  return (
  <div>
    {widgets.map((widget) =>  <Widget key={widget.title} {...widget} /> )}
  </div>
  )
}
