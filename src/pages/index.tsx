import { ReactElement } from 'react'
import { NextPageWithLayout } from './_app'
import { AppLayout } from '@/components/layout/app-layout'

const Home: NextPageWithLayout = () => {
  return <h1>Delete me</h1>
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>
}

export default Home
