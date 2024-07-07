import React, { useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { LikeButton } from "@/components/ui/like-button";
import { IconButton } from "@/components/ui/icon-button";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import TrashIcon from "../../../public/icons/trash.svg";
import { formatPrice, getProductMainTagColor } from "@/utils/helpers";
import { useTranslation } from "next-i18next";
import { useFavoriteStore } from "@/store/favorite";
import { routeNames, generateProductLink } from "@/utils/navigation";
import type { ProductTag } from "@/types";

import styles from "./styles.module.scss";

interface ProductItemProps {
  id: string;
  slug: string;
  url: string;
  title: string;
  price: number;
  inStock: boolean;
  basePrice: number;
  tag?: keyof typeof ProductTag | null;
  isFavorite: boolean;
  withDelete?: boolean;
}

export function ProductItem({
  id,
  slug,
  url,
  title,
  price,
  inStock,
  tag,
  basePrice,
  isFavorite,
  withDelete = false,
}: ProductItemProps) {
  const addToFavorite = useFavoriteStore((state) => state.add);
  const removeFavorite = useFavoriteStore((state) => state.remove);

  const { t } = useTranslation("common");
  const [isLiked, setLiked] = useState<boolean>(isFavorite);

  const handleActionClick = (): void => {
    if (isLiked) {
      removeFavorite(id);
    } else {
      addToFavorite(id);
    }

    setLiked(!isLiked);
  };

  function genTagView(productTag: string): React.ReactElement | null {
    switch (productTag) {
      case "new":
        return <span>{t(`productTag.${tag}`)}</span>;
      case "top":
        return (
          <Image
            width={19}
            height={19}
            src="/assets/icons/fire.png"
            alt="смайлик - огонь"
          />
        );
      case "stock":
        return (
          <span>-{Math.round(((basePrice - price) * 100) / basePrice)}%</span>
        );
      default:
        return null;
    }
  }

  return (
    <div className={styles.container}>
      <div className={clsx(styles.imageWrapper, !inStock && styles.outStock)}>
        <Link href={generateProductLink(routeNames.product, id, slug)}>
          <ImagePlaceholder src={url} altText={title} />
        </Link>
      </div>
      <div className={styles.info}>
        <div className={styles.priceBox}>
          <div
            className={clsx({
              [styles.price]: true,
              [styles.discount]: basePrice !== price,
              [styles.outStock]: !inStock,
            })}
          >
            {basePrice !== price && (
              <p className={styles["discount-price"]}>
                {formatPrice(basePrice)}&nbsp;₴
              </p>
            )}
            <span>{formatPrice(price)}&nbsp;₴</span>
          </div>
          <div className={styles.buttonWrapper}>
            {withDelete ? (
              <IconButton onClick={handleActionClick}>
                <div className={clsx("svg-icon", styles.trashIcon)}>
                  <TrashIcon />
                </div>
              </IconButton>
            ) : (
              <LikeButton liked={isLiked} onClick={handleActionClick} />
            )}
          </div>
        </div>
        <Link
          className={clsx(styles.title, !inStock && styles.outStock)}
          title={title}
          href={generateProductLink(routeNames.product, id, slug)}
        >
          {title}
        </Link>
      </div>
      {tag && (
        <div
          className={styles.tag}
          style={{
            backgroundColor: getProductMainTagColor(tag),
          }}
        >
          {genTagView(tag)}
        </div>
      )}
    </div>
  );
}
