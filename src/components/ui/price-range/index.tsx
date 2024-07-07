import React, { useState, useEffect } from 'react'
import Slider from 'rc-slider'
import { Button } from '@/components/ui/button'
import { Collapse, CollapseHead } from '@/components/ui/collapse'
import type { SliderProps } from 'rc-slider'

import styles from './styles.module.scss'
import 'rc-slider/assets/index.css'

interface PriceRangeProps {
  title: string
  min: number
  max: number
  step?: number
  onSet(range: [number, number]): void
}

export function PriceRange({ title, min, max, step = 1, onSet }: PriceRangeProps) {
  const [isCollapsed, setCollapsed] = useState(true)

  const [minInputValue, setMinInputValue] = useState(min)
  const [maxInputValue, setMaxInputValue] = useState(max)

  const [sliderMin, setSliderMin] = useState(min)
  const [sliderMax, setSliderMax] = useState(max)

  useEffect(() => {
    setMinInputValue(min)
    setMaxInputValue(max)

    setSliderMin(min)
    setSliderMax(max)
  }, [min, max])

  const handleCollapse = (): void => {
    setCollapsed(!isCollapsed)
  }

  const onSliderChange = (values: number | number[]): void => {
    if (Array.isArray(values)) {
      const [min, max] = values

      setMinInputValue(min)
      setMaxInputValue(max)

      setSliderMin(min)
      setSliderMax(max)
    }
  }

  const onMinChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const min = +event.target.value
    setMinInputValue(min)
    setSliderMin(min)
  }

  const onMaxChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const max = +event.target.value
    setMaxInputValue(max)
    setSliderMax(max)
  }

  const handleSubmit = () => {
    onSet([minInputValue, maxInputValue])
  }

  const marks: SliderProps['marks'] = {
    [min]: {
      label: <span className={styles.sliderMark}>{min}</span>
    },
    [max]: {
      label: <span className={styles.sliderMark}>{max}</span>
    }
  }

  return (
    <div>
      <CollapseHead title={title} collapsed={isCollapsed} onCollapse={handleCollapse} />
      <Collapse open={isCollapsed}>
        <div className={styles.container}>
          <div className={styles.controls}>
            <input
              type="number"
              value={minInputValue}
              onChange={onMinChange}
              className={styles.priceInput}
            />
            <input
              type="number"
              value={maxInputValue}
              onChange={onMaxChange}
              className={styles.priceInput}
            />
            <Button color="secondary" onClick={handleSubmit} className={styles.setButton}>
              ok
            </Button>
          </div>
          <div className={styles.sliderWrapper}>
            <Slider
              step={step}
              range
              min={min}
              max={max}
              value={[sliderMin, sliderMax]}
              marks={marks}
              onChange={onSliderChange}
              className={styles.slider}
            />
          </div>
        </div>
      </Collapse>
    </div>
  )
}
