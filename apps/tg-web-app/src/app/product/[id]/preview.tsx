'use client'

import { useState } from 'react'
import { cva } from 'cva'
import { ImagePlaceholder } from '@repo/ui'
import { useKeenSlider } from 'keen-slider/react'

const dot = cva('mx-0.5 size-2 rounded-full', {
  variants: {
    active: {
      true: 'bg-gray-500',
      false: 'bg-gray-300'
    }
  }
})

export function Preview({
  images,
  basePrice,
  currentPrice
}: {
  images: string[]
  basePrice: number
  currentPrice: number
}) {
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

  const withDiscount = basePrice !== currentPrice

  // const handlePaginationChange = (index: number): void => {
  //   if (instanceRef.current) {
  //     instanceRef.current.moveToIdx(index)
  //   }
  // }

  return (
    <div className="relative">
      <ul ref={sliderRef} className="keen-slider cursor-grab">
        {images.map((image, index) => (
          <li key={index} className="keen-slider__slide">
            <ImagePlaceholder
              src={image}
              quality={100}
              priority
              width={1080}
              height={1350}
              alt={`фото №${index + 1}`}
            />
          </li>
        ))}
      </ul>
      <ul className="absolute bottom-2 left-1/2 flex -translate-x-1/2">
        {[...Array(images.length)].map((_, index) => (
          <li key={index} className={dot({ active: currentIndex === index })} />
        ))}
      </ul>
      {withDiscount && (
        <div className="absolute top-5 right-5">
          <span className="bg-red-600 px-2 py-0.5 text-center text-sm font-medium text-white">
            -{Math.round(((basePrice - currentPrice) * 100) / basePrice)}%
          </span>
        </div>
      )}
    </div>
  )
}
