import { useState, useEffect, ChangeEvent } from 'react'
import Slider, { type SliderProps } from 'rc-slider'
import { Collapse, CollapseHead } from '@/components/ui/collapse'

import styles from './styles.module.css'
import 'rc-slider/assets/index.css'
import { cva } from 'cva'

interface PriceRangeProps {
  title: string
  min: number
  max: number
  step?: number
  onSet(range: [number, number]): void
}

const priceInput = cva('mr-2 w-16 rounded-md border border-gray-300 px-1 py-0.5')

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

  const handleCollapse = () => {
    setCollapsed(!isCollapsed)
  }

  const onSliderChange = (values: number | number[]) => {
    if (Array.isArray(values)) {
      const [min, max] = values

      setMinInputValue(min)
      setMaxInputValue(max)

      setSliderMin(min)
      setSliderMax(max)
    }
  }

  const onMinChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const min = +event.target.value
    setMinInputValue(min)
    setSliderMin(min)
  }

  const onMaxChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const max = +event.target.value
    setMaxInputValue(max)
    setSliderMax(max)
  }

  const handleSubmit = () => {
    onSet([minInputValue, maxInputValue])
  }

  const marks: SliderProps['marks'] = {
    [min]: {
      label: <span className="font-medium text-black">{min}</span>
    },
    [max]: {
      label: <span className="font-medium text-black">{max}</span>
    }
  }

  return (
    <div>
      <CollapseHead title={title} collapsed={isCollapsed} onCollapse={handleCollapse} />
      <Collapse open={isCollapsed}>
        <div className="pb-8 pl-3 pr-4 pt-5">
          <div className="mb-5 flex items-center">
            <input
              type="number"
              value={minInputValue}
              onChange={onMinChange}
              className={priceInput()}
            />
            <input
              type="number"
              value={maxInputValue}
              onChange={onMaxChange}
              className={priceInput()}
            />
            <button
              onClick={handleSubmit}
              type="button"
              className="w-16 rounded-sm border border-gray-200 bg-gray-100 py-0.5 font-medium text-slate-600"
            >
              OK
            </button>
          </div>
          <div className="pl-1.5">
            <Slider
              step={step}
              range
              min={min}
              max={max}
              value={[sliderMin, sliderMax]}
              marks={marks}
              onChange={onSliderChange}
              className={styles.rangeSlider}
            />
          </div>
        </div>
      </Collapse>
    </div>
  )
}
