import { ReactElement, ReactNode } from 'react'
import Head from 'next/head'
import Modal from 'react-modal'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '@/apollo/ssr'
import { Montserrat } from 'next/font/google'
import type { AppProps } from 'next/app'
import { NextPage } from 'next'
import { Toaster } from 'sonner'

import '@/styles/globals.scss'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const montserrat = Montserrat({
  weight: ['400', '500', '600'],
  subsets: ['latin', 'cyrillic'],
  style: 'normal',
  variable: '--font-montserrat',
  display: 'swap'
})

Modal.setAppElement('#__next')

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const apolloClient = useApollo(pageProps.initialApolloState)

  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <>
      <Head>
        <title>BK405</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ApolloProvider client={apolloClient}>
        <style jsx global>
          {`
            html {
              font-family: ${montserrat.style.fontFamily};
            }
          `}
        </style>
        {getLayout(<Component {...pageProps} />)}
        <Toaster position="bottom-right" richColors expand />
      </ApolloProvider>
    </>
  )
}

export default MyApp
