import Head from 'next/head'
import Link from 'next/link'
import { useAuth } from '../src/hooks/auth'

export default function Home() {
  const { loggedIn, userId } = useAuth();
  return (
    <div>
      <Head>
        <title>Nextjs with LIFF</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>sub page</h1>
        {loggedIn && <p>{userId}</p>}
        <p><button>{loggedIn ? 'Log out' : 'Log in'}</button></p>
        <p><Link href='/'>index page</Link></p>
      </main>
    </div>
  )
}
