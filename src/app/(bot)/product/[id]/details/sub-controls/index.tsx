import clsx from 'clsx'
import CommentIcon from '../../../../../../../public/icons/comment.svg'
import ShareIcon from '../../../../../../../public/icons/share.svg'
import { Button } from '@/components/ui/button'
import { SvgIcon } from '@/components/ui/svg-icon'
import { LikeButton } from '@/components/ui/like-button'
import { useFavoriteStore } from '@/store/favorite'

import styles from './styles.module.scss'

interface SubControlsProps {
  productId: string
}

export function SubControls({ productId }: SubControlsProps) {
  const favoriteItems = useFavoriteStore((state) => state.favoriteItems)
  const addToFavorite = useFavoriteStore((state) => state.add)
  const removeFavorite = useFavoriteStore((state) => state.remove)

  const isLiked = favoriteItems.includes(productId)

  const handleLikeClick = (): void => {
    if (isLiked) {
      removeFavorite(productId)
    } else {
      addToFavorite(productId)
    }
  }

  return (
    <div className={styles.container}>
      <Button
        color="secondary"
        className={styles.controlButton}
        startIcon={
          <SvgIcon className={styles.icon}>
            <CommentIcon />
          </SvgIcon>
        }
      >
        Комментарии
      </Button>
      {/*  */}
      <LikeButton
        text={isLiked ? 'Избранное' : 'В избранное'}
        disableRipple
        width={18}
        height={18}
        liked={isLiked}
        onClick={handleLikeClick}
        className={clsx(styles.controlButton, styles.likeButton)}
      />
      {/*  */}
      <Button
        color="secondary"
        className={styles.controlButton}
        startIcon={
          <SvgIcon className={clsx(styles.icon, styles.shareIcon)}>
            <ShareIcon />
          </SvgIcon>
        }
      >
        Поделиться
      </Button>
    </div>
  )
}
