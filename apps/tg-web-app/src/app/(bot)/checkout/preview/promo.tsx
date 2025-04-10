export function Promo() {
  const percent = 5

  return (
    <div className="bg-checkoutPromo mt-4 select-none rounded-lg bg-cover bg-center bg-no-repeat py-2">
      <div className="flex items-center justify-between font-medium leading-none text-white">
        <div className="ml-4 rounded-md bg-white px-2 py-1">
          <span className="text-[18px] text-red-600">-{percent}%</span>
        </div>
        <div className="mr-5 text-lg">
          <p>Бонус на первую покупку</p>
        </div>
      </div>
    </div>
  )
}
