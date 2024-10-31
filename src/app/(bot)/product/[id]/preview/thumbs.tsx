import { cva } from 'cva'
import Image from 'next/image'

const image = cva('rounded-lg border', {
  variants: {
    active: {
      true: 'border-black'
    }
  }
})

interface ThumbsProps {
  activeIndex: number
  images: string[]
  onChange(index: number): void
}

export function Thumbs({ activeIndex, images, onChange }: ThumbsProps) {
  return (
    <ul className="no-scrollbar mt-2.5 flex overflow-x-auto px-1">
      {images.map((url, index) => (
        <li
          key={index}
          onClick={() => onChange(index)}
          className="mr-1.5 max-w-16 shrink-0 last:mr-0"
        >
          <Image
            src={url}
            width={175}
            height={175}
            alt="Фото товара"
            className={image({ active: index === activeIndex })}
          />
        </li>
      ))}
    </ul>
  )
}
