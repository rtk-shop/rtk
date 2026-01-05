import { Box } from '@/components/ui/box'

export function Promo() {
  const percent = 5

  return (
    <Box className="bg-checkoutPromo mt-4 rounded-lg bg-cover bg-center bg-no-repeat py-2 select-none">
      <div className="flex items-center justify-between leading-none font-medium text-white">
        <div className="ml-4 rounded-md bg-white px-2 py-1">
          <span className="text-[18px] text-red-600">-{percent}%</span>
        </div>
        <div className="mr-5 text-lg">
          <p>Бонус на первую покупку</p>
        </div>
      </div>
    </Box>
  )
}
