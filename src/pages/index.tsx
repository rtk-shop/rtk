import { HomeIndex } from '@/components/views/home'
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
export default function Home() {
  return <HomeIndex />
}
