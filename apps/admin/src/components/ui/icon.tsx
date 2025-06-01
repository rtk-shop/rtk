import clsx from 'clsx'
import type { SVGProps } from 'react'
import { type SpritesMap } from '@/sprite.gen'
import { getIconMeta } from '@/lib/icons-meta'

// Our icon will extend an SVG element and accept all its props
export interface IconProps extends SVGProps<SVGSVGElement> {
  name: AnyIconName
}

// Merging all possible icon names as `sprite/icon` string
export type AnyIconName = { [Key in keyof SpritesMap]: IconName<Key> }[keyof SpritesMap]

// Icon name for a specific sprite, e.g. "common/left"
export type IconName<Key extends keyof SpritesMap> = `${Key}/${SpritesMap[Key]}`

export function Icon({ name, className, ...props }: IconProps) {
  const { viewBox, filePath, iconName, axis } = getIconMeta(name)

  return (
    <svg
      className={clsx(
        'icon',
        'box-content inline-block fill-current text-inherit select-none',
        className
      )}
      viewBox={viewBox}
      data-axis={axis}
      focusable="false"
      aria-hidden
      {...props}
    >
      <use href={`/sprites/${filePath}#${iconName}`} />
    </svg>
  )
}
