import { useState } from 'react'
import clsx from 'clsx'
import { Thumbs } from './thumbs'
import { NavButtons } from '@/components/ui/nav-buttons'
import { ImagePlaceholder } from '@/components/ui/image-placeholder'
import { useKeenSlider } from 'keen-slider/react'

import styles from './styles.module.scss'

interface PreviewProps {
  images: string[]
}

export function Preview({ images }: PreviewProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    loop: true,
    slides: {
      spacing: 10,
      perView: 'auto',
      number: images.length
    },
    slideChanged(slider) {
      setCurrentIndex(slider.track.details.rel)
    }
  })

  const handlePrevClick = () => {
    instanceRef.current?.prev()
  }

  const handleNextClick = () => {
    instanceRef.current?.next()
  }

  const handlePaginationChange = (index: number): void => {
    if (instanceRef.current) {
      instanceRef.current.moveToIdx(index)
    }
  }

  return (
    <div className={styles.root}>
      <Thumbs activeIndex={currentIndex} images={images} onChange={handlePaginationChange} />

      <div className={styles.sliderWrapper}>
        <ul ref={sliderRef} className={clsx('keen-slider', styles.previewSlider)}>
          {images.map((image, index) => (
            <li key={index} className="keen-slider__slide">
              <ImagePlaceholder priority src={image} altText={`фото №${index + 1}`} />
            </li>
          ))}
        </ul>
        <NavButtons onPrev={handlePrevClick} onNext={handleNextClick} />
      </div>
    </div>
  )
}
