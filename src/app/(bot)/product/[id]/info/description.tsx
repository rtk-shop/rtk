export function Description({ text }: { text: string }) {
  return (
    <div className="py-5 pl-1">
      <h2 className="mb-3 text-2xl font-medium">Описание</h2>
      <p>{text}</p>
    </div>
  )
}
