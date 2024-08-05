import { ReactElement } from 'react'
import { HomeIndex } from '@/components/views/home'
import { NextPageWithLayout } from './_app'
import { AppLayout } from '@/components/layout/app-layout'
// import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
// import globalData, { QueryResult } from './api/globalData'
// import { ApolloInitState } from '@/apollo/ssr'

// export const getServerSideProps: GetServerSideProps<{
//   usdCourse: number
//   // initialApolloState: ApolloInitState
// }> = async () => {
//   const [client, { usdCourse }] = await globalData()

//   // console.log(data.usdCourse)

//   return {
//     props: { usdCourse }
//   }
// }

// export default function Home(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
const Home: NextPageWithLayout = () => {
  return <HomeIndex />
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>
}

export default Home
