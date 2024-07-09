import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/gardevoir" />
      </Head>
      <body>
        <Main />
        <div id="app-drawers" />
        <NextScript />
      </body>
    </Html>
  )
}
