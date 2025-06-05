export interface SpritesMap {
  common:
    | 'arrow'
    | 'box-taped'
    | 'calendar'
    | 'menu'
    | 'signal'
    | 'tags'
    | 'user'
    | 'warehouse'
    | 'warning'
}
export const SPRITES_META: {
  [Key in keyof SpritesMap]: {
    filePath: string
    items: Record<
      SpritesMap[Key],
      {
        viewBox: string
        width: number
        height: number
      }
    >
  }
} = {
  common: {
    filePath: 'common.b202cf5b.svg',
    items: {
      arrow: {
        viewBox: '0 0 24 24',
        width: 24,
        height: 24
      },
      'box-taped': {
        viewBox: '0 0 512 512',
        width: 512,
        height: 512
      },
      calendar: {
        viewBox: '0 0 448 512',
        width: 448,
        height: 512
      },
      menu: {
        viewBox: '0 0 448 512',
        width: 448,
        height: 512
      },
      signal: {
        viewBox: '0 0 640 512',
        width: 640,
        height: 512
      },
      tags: {
        viewBox: '0 0 512 512',
        width: 512,
        height: 512
      },
      user: {
        viewBox: '0 0 512 512',
        width: 512,
        height: 512
      },
      warehouse: {
        viewBox: '0 0 640 512',
        width: 640,
        height: 512
      },
      warning: {
        viewBox: '0 0 512 512',
        width: 512,
        height: 512
      }
    }
  }
}
