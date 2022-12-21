import { createContext, useMemo, useState } from 'react';

const AuthContext = createContext<{
  auth: any;
  setAuth: (auth: any) => void;
}>({
  auth: undefined,
  setAuth(auth: any): void {
    throw new Error('Function not implemented.');
  },
});

export function AuthProvider({ children }: any) {
  const [auth, setAuth] = useState({});

  const value = useMemo(() => ({ auth, setAuth }), [auth, setAuth]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
