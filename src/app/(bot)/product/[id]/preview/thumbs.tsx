import { ImagePlaceholder } from '@/components/ui/image-placeholder'
import { cva } from 'cva'

const image = cva('mr-1.5 max-w-16 shrink-0 rounded-lg border transition-colors last:mr-0', {
  variants: {
    active: {
      true: 'border-gray-500'
    }
  }
})

export interface ThumbsProps {
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
          className={image({ active: index === activeIndex })}
        >
          <ImagePlaceholder src={url} altText="фото товара" width={52} height={65} />
        </li>
      ))}
    </ul>
  )
}
