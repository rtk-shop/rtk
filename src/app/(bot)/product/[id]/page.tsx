import { getProduct } from '@/lib/api'

export default async function Product({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id

  const data = await getProduct(id)

  return (
    <div>
      <h1>Product page </h1>
      <h2>Product ID{id}</h2>
      <textarea rows={10} cols={50}>
        {JSON.stringify(data)}
      </textarea>
    </div>
  )
}
