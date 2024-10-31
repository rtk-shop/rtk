'use client'

import { useState } from 'react'
import { Thumbs } from './thumbs'
import { ImagePlaceholder } from '@/components/ui/image-placeholder'
import { useKeenSlider } from 'keen-slider/react'

interface PreviewProps {
  images: string[]
}

export function Preview({ images }: PreviewProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    loop: true,
    slides: {
      perView: 1,
      number: images.length
    },
    slideChanged(slider) {
      setCurrentIndex(slider.track.details.rel)
    }
  })

  const handlePaginationChange = (index: number): void => {
    if (instanceRef.current) {
      instanceRef.current.moveToIdx(index)
    }
  }

  return (
    <div>
      <ul ref={sliderRef} className="keen-slider cursor-grab">
        {images.map((image, index) => (
          <li key={index} className="keen-slider__slide">
            <ImagePlaceholder priority src={image} altText={`фото №${index + 1}`} />
          </li>
        ))}
      </ul>
      <Thumbs activeIndex={currentIndex} images={images} onChange={handlePaginationChange} />
    </div>
  )
}
