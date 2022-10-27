import { createContext } from "react";
import { useGet } from "../hooks";

export const DataContext = createContext({
  works: [],
});

export function DataProvider({ children }) {
  const { data, loadState } = useGet("/api/works");
  return (
    <DataContext.Provider value={{ data, loadState }}>
      {children}
    </DataContext.Provider>
  );
}
