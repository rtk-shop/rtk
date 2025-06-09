import clsx from 'clsx'
import { getIconMeta } from '@/lib/get-icon-meta'
import type { SVGProps } from 'react'
import { type SpritesMap } from '@/sprite.gen'

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'ref'> {
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
      className={clsx('icon', className)}
      viewBox={viewBox}
      /**
       * This prop is used by the "icon" class to set the icon's scaled size
       * @see https://github.com/secundant/neodx/issues/92
       */
      data-axis={axis}
      // prevent icon from being focused when using keyboard navigation
      focusable="false"
      // hide icon from screen readers
      aria-hidden
      {...props}
    >
      <use href={`/sprites/${filePath}#${iconName}`} />
    </svg>
  )
}
