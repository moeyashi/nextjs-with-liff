import { createContext, FC, useContext, useEffect, useState } from "react"
import type Liff from '@line/liff'

const AuthContext = createContext<typeof Liff>(undefined)

export const AuthProvider: FC = ({ children }) => {

  const [liff, setLiff] = useState<typeof Liff>()

  useEffect(() => {
    let unmounted = false
    const func = async () => {
      const liff = (await import('@line/liff')).default
      console.log('import liff')
      await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID })
      if (!unmounted) {
        setLiff(liff)
      }
    }
    func()
    const cleanup = () => {
      unmounted = true
    }
    return cleanup
  }, [])


  return (
    <AuthContext.Provider
      value={liff}
    >
      {children}
    </AuthContext.Provider>
  )
}

type UseAuthReturn = {
  initialized: boolean;
  loggedIn: boolean;
  userId?: string;
  login: () => void;
}

export const useAuth = (): UseAuthReturn => {
  const liff = useContext(AuthContext)

  if (!liff) {
    return {
      initialized: false,
      loggedIn: false,
      login: () => {},
    }
  }

  return {
    initialized: true,
    loggedIn: liff.isLoggedIn(),
    login: liff.login,
    userId: liff.getContext().userId,
  }
}