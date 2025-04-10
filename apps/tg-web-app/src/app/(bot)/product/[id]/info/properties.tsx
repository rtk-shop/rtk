interface PropertiesProps {
  gender: string
  category: string
  weight: string
  dimensions: string
  color: string
}

export function Properties({ gender, dimensions, weight, color, category }: PropertiesProps) {
  const details = [
    {
      name: 'Размер в см.',
      value: dimensions
    },
    {
      name: 'Вес в кг.',
      value: weight
    },
    {
      name: 'Цвет',
      value: color
    },
    {
      name: 'Тип',
      value: gender
    },
    {
      name: 'Категория',
      value: category
    }
  ]

  return (
    <div className="py-5 pl-1">
      <h2 className="mb-3 text-2xl font-medium">Подробности</h2>
      <div>
        <ul>
          {details
            .filter((d) => !!d.value)
            .map((d) => (
              <li key={d.name} className="mb-1 flex justify-between font-medium">
                <span className="shrink-0 text-gray-500">{d.name}</span>
                <span className="basis-7/12 text-black">
                  <span className="mr-4">:</span>
                  <span>{d.value}</span>
                </span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}
