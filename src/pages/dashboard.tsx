import { ReactElement } from 'react'
import { AppLayout } from '@/components/layout/app-layout'
import { DashboardView } from '@/components/views/dashboard'
import { NextPageWithLayout } from './_app'

const Dashboard: NextPageWithLayout = () => {
  return <DashboardView />
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>
}

export default Dashboard
