import { createContext, ReactNode, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type SettingProviderProps = {
  children: ReactNode;
};

export type SettingType = {
  alarm: string
  audioVolume: number
  pomodoro: number
  shortBreak: number
  longBreak: number
}

type SettingContextType = {
  settings: SettingType;
  setSettings: any
};

const DEFAULT_SETTINGS: SettingType = {
  alarm: 'Lance',
  audioVolume: 0.4,
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15
}

const SettingContext = createContext({} as SettingContextType);

export function useSetting() {
  return useContext(SettingContext);
}

export function SettingProvider({ children }: SettingProviderProps) {
  const [settings, setSettings] = useLocalStorage<SettingType>("settings", DEFAULT_SETTINGS);

  return (
    <SettingContext.Provider
      value={{
        settings,
        setSettings,
      }}
    >
      {children}
    </SettingContext.Provider>
  );
}
