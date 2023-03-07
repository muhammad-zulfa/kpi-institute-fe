import { IHistory } from "@components/breadcrumb";
import React, { createContext, ReactNode } from "react";

export interface GeneralContextType {
  setHistories: (data: IHistory[]) => void;
  pushHistory: (data: IHistory) => void;
  histories: IHistory[];
}

export const GeneralContext = createContext<GeneralContextType>({} as GeneralContextType)

export interface GeneralProviderProps {
  children?: ReactNode;
}

export const GeneralProvider: React.FC<GeneralProviderProps> = ({ children }) => {
  const [histories, setHistories] = React.useState<IHistory[]>([])

  const pushHistory = (data: any) => {
    setHistories([...histories, data])
  }

  return (
    <GeneralContext.Provider value={{ setHistories, pushHistory, histories }}>
      {children}
    </GeneralContext.Provider>
  )
}