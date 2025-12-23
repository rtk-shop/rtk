import { useState, useEffect } from 'react'
import { cva } from 'cva'

const item = cva(
  'm-1 flex size-9 cursor-pointer select-none items-center justify-center rounded-md font-medium transition-colors',
  {
    variants: {
      current: {
        true: 'bg-black text-white',
        false: 'bg-gray-100 hover:bg-gray-200'
      }
    }
  }
)

export function NumberedPagination({
  total,
  currentPage,
  onChange
}: {
  total: number
  currentPage: number
  onChange(page: number): void
}) {
  const [current, setCurrent] = useState(currentPage > total ? total : currentPage)
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
    <ul className="flex items-center justify-center">
      {items.map((page, ind) => {
        return (
          <li
            key={ind}
            onClick={() => handlePaginationChange(page)}
            className={item({ current: current === page })}
          >
            {page}
          </li>
        )
      })}
    </ul>
  )
}
