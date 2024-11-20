export interface SpritesMap {
  action: 'circle-minus' | 'circle-plus' | 'edit' | 'search' | 'share' | 'trash' | 'warning'
  checkout: 'box-taped' | 'letter'
  common: 'arrow' | 'cart' | 'check' | 'emptycart' | 'grid' | 'heart' | 'menu' | 'user' | 'xmark'
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
  action: {
    filePath: 'action.6b23f06d.svg',
    items: {
      'circle-minus': {
        viewBox: '0 0 512 512',
        width: 512,
        height: 512
      },
      'circle-plus': {
        viewBox: '0 0 512 512',
        width: 512,
        height: 512
      },
      edit: {
        viewBox: '0 0 512 512',
        width: 512,
        height: 512
      },
      search: {
        viewBox: '0 0 18 18',
        width: 18,
        height: 18
      },
      share: {
        viewBox: '0 0 512 512',
        width: 512,
        height: 512
      },
      trash: {
        viewBox: '0 0 20 20',
        width: 20,
        height: 20
      },
      warning: {
        viewBox: '0 0 512 512',
        width: 512,
        height: 512
      }
    }
  },
  checkout: {
    filePath: 'checkout.f7fbd2cd.svg',
    items: {
      'box-taped': {
        viewBox: '0 0 512 512',
        width: 512,
        height: 512
      },
      letter: {
        viewBox: '0 0 576 576',
        width: 576,
        height: 576
      }
    }
  },
  common: {
    filePath: 'common.1ba77b61.svg',
    items: {
      arrow: {
        viewBox: '0 0 24 24',
        width: 24,
        height: 24
      },
      cart: {
        viewBox: '0 0 128 128',
        width: 128,
        height: 128
      },
      check: {
        viewBox: '0 0 512 512',
        width: 512,
        height: 512
      },
      emptycart: {
        viewBox: '0 0 775 395',
        width: 775,
        height: 395
      },
      grid: {
        viewBox: '0 0 512 512',
        width: 512,
        height: 512
      },
      heart: {
        viewBox: '0 0 128 128',
        width: 128,
        height: 128
      },
      menu: {
        viewBox: '0 0 448 512',
        width: 448,
        height: 512
      },
      user: {
        viewBox: '0 0 512 512',
        width: 512,
        height: 512
      },
      xmark: {
        viewBox: '0 0 20 20',
        width: 20,
        height: 20
      }
    }
  }
}
