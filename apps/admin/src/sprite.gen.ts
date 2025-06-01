export interface SpritesMap {
  common: 'user'
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
    filePath: 'common.921c9205.svg',
    items: {
      user: {
        viewBox: '0 0 512 512',
        width: 512,
        height: 512
      }
    }
  }
}
