import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.css'
import { AuthProvider } from '../context/AuthContext'
import Head from 'next/head'
import '../styles.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <AuthProvider>
      <Head>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Component {...pageProps} />
    </AuthProvider>
  ) 
}

export default MyApp