'use client'

import { type ReactNode, useState } from 'react'
import { Box } from '@/components/ui/box'
import { cva } from 'cva'
import { ImagePlaceholder } from '@/components/ui/image-placeholder'
import { useKeenSlider } from 'keen-slider/react'

const dot = cva('mx-0.5 size-2 rounded-full', {
  variants: {
    active: {
      true: 'bg-gray-600',
      false: 'bg-gray-300'
    }
  }
})

export function Preview({ images, tag }: { images: string[]; tag: ReactNode }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const [sliderRef, _instanceRef] = useKeenSlider({
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

  // const handlePaginationChange = (index: number): void => {
  //   if (instanceRef.current) {
  //     instanceRef.current.moveToIdx(index)
  //   }
  // }

  return (
    <Box className="relative">
      <Box as="ul" ref={sliderRef} className="keen-slider">
        {images.map((image, index) => (
          <Box as="li" key={index} className="keen-slider__slide">
            <ImagePlaceholder
              src={image}
              quality={100}
              priority
              width={1080}
              height={1350}
              alt={`фото №${index + 1}`}
            />
          </Box>
        ))}
      </Box>
      <Box as="ul" className="absolute bottom-2 left-1/2 flex -translate-x-1/2">
        {[...Array(images.length)].map((_, index) => (
          <Box as="li" key={index} className={dot({ active: currentIndex === index })} />
        ))}
      </Box>
      <div className="absolute top-5 right-5">{tag}</div>
    </Box>
  )
}
