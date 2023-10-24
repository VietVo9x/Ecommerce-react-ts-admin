import {
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
  useState,
} from "react";
export interface I_IsLoginContext {
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}
const defaultState = {
  isLogin: false,
  setIsLogin: (isLogin: boolean) => {},
} as I_IsLoginContext;
export const IsLoginContext = createContext<I_IsLoginContext>(defaultState);

interface IsLoginProviderProps {
  children: ReactNode;
}

const IsLoginProvider = ({ children }: IsLoginProviderProps) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  return (
    <IsLoginContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </IsLoginContext.Provider>
  );
};

export default IsLoginProvider;
