import { createContext, ReactNode, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type WidgetProviderProps = {
  children: ReactNode;
};

export type Widget = {
  title: string;
  x: number;
  y: number;
};

type WidgetContextType = {
  widgets: Widget[];
  setWidgets: (widgets: Widget[]) => void;
  updateWidget: (name: string, x: number, y: number) => void;
};

const WidgetContext = createContext({} as WidgetContextType);

export function useWidgets() {
  return useContext(WidgetContext);
}

const TASK_WIDGET: Widget = {
  title: "Tasks",
  x: 200,
  y: 200,
}

const DEFAULT_WIDGETS = [
  TASK_WIDGET,
];

export function WidgetProvider({ children }: WidgetProviderProps) {
  const [widgets, setWidgets] = useLocalStorage<Widget[]>(
    "widgets",
    DEFAULT_WIDGETS
  );

  function updateWidget(title: string, x: number, y: number) {
    setWidgets((currWidgets) => {
      return currWidgets.map((widget) => {
        if (widget.title === title) {
          return { ...widget, x: x, y: y };
        } else {
          return widget;
        }
      });
    });
  }

  return (
    <WidgetContext.Provider
      value={{
        widgets,
        setWidgets,
        updateWidget,
      }}
    >
      {children}
    </WidgetContext.Provider>
  );
}
