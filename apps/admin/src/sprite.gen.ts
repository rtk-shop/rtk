export interface SpritesMap {
  common: 'box-taped' | 'user' | 'warehouse'
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
    filePath: 'common.fba2f307.svg',
    items: {
      'box-taped': {
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
      }
    }
  }
}
