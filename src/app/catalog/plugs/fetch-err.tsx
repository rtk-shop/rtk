import { Box } from '@/components/ui/box'
import { ServerFetchError } from '@/components/ui/server-fetch-error'

export function FetchError() {
  return (
    <>
      <style precedence="high">
        {`
          main {
            height: 100dvh;
          }
        `}
      </style>
      <Box className="h-full">
        <ServerFetchError message={'В нас щось сталось, вже працюємо над цим!'} />
      </Box>
    </>
  )
}
