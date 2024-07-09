import { useState, useEffect } from 'react'
import clsx from 'clsx'
import styles from './styles.module.scss'

interface PaginationProps {
  total: number
  currentPage: number
  onChange(page: number): void
}

export function Pagination({ total, currentPage, onChange }: PaginationProps) {
  const [current, setCurrent] = useState<number>(currentPage > total ? total : currentPage)
  const [items, setItems] = useState<(string | number)[]>([])

  const handlePaginationChange = (value: number | string) => {
    if (typeof value === 'number') {
      setCurrent(value)
      onChange(value)
    }
  }

  useEffect(() => {
    const stageItems: (string | number)[] = []

    let i, showFirst, showLast

    const constantSlots = 8

    const isCollapsed = constantSlots <= 6
    const slots = Math.min(constantSlots, total)
    const ellipsisPos: number[] = []

    // Center active page in middle of pagination
    let start = current - Math.round(constantSlots / 2) + 1

    // If pagination values exceed the expected range,
    const overflow = start + slots - 1 - total
    if (overflow > 0) start -= overflow
    if (start <= 0) start -= start - 1

    const end = start + slots - 1

    // Check if it should have ellipsis and define sllipsis position
    const hasEllipsisLeft = start > 1
    const hasEllipsisRright = end < total
    if (hasEllipsisLeft) ellipsisPos.push(isCollapsed ? start : start + 1)
    if (hasEllipsisRright) ellipsisPos.push(isCollapsed ? end : end - 1)

    for (i = start; i <= end; i++) {
      showFirst = !isCollapsed && i === start && hasEllipsisLeft
      showLast = !isCollapsed && i === end && hasEllipsisRright

      if (showFirst) {
        stageItems.push(1)
      } else if (ellipsisPos.includes(i)) {
        stageItems.push('...')
      } else if (showLast) {
        stageItems.push(total)
      } else {
        stageItems.push(i)
      }
    }
    setItems(stageItems)
  }, [current, total])

  return (
    <ul className={styles.list}>
      {items.map((page, ind) => {
        return (
          <li
            key={ind}
            onClick={() => handlePaginationChange(page)}
            className={clsx(styles.item, current === page && styles.current)}
          >
            {page}
          </li>
        )
      })}
    </ul>
  )
}
