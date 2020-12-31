import type { AppProps } from 'next/app'
import { FC } from 'react'
import { AuthProvider, useAuth } from '../src/hooks/auth'

const Layout: FC = ({ children }) => {
  const { initialized, loggedIn, login } = useAuth()

  if (!initialized) {
    return <p>loading...</p>
  }

  if (!loggedIn) {
    return <button onClick={login}>log in</button>
  }

  return (
    <>{children}</>
  )
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}

export default MyApp