import React from "react";
import clsx from "clsx";
import { IconButton } from "@/components/ui/icon-button";

import styles from "./LikeButton.module.scss";

interface LikeButtonProps {
  liked: boolean;
  width?: number;
  height?: number;
  text?: string;
  disableRipple?: boolean;
  className?: string;
  onClick: (e: React.MouseEvent) => void;
}

export function LikeButton({
  liked,
  width = 20,
  height = 20,
  text,
  className,
  ...restProps
}: LikeButtonProps) {
  return (
    <IconButton className={clsx(styles.button, className)} {...restProps}>
      <svg
        viewBox="0 0 24 24"
        width={width}
        height={height}
        className={clsx({
          [styles.svgEL]: true,
          [styles.liked]: liked,
          [styles.withText]: !!text,
        })}
      >
        <use xlinkHref="#heart" />
        <use xlinkHref="#heart" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        width={width}
        height={height}
        className={clsx({
          [styles.hide]: true,
          [styles.liked]: liked,
        })}
      >
        <defs>
          <path
            id="heart"
            d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z"
          />
        </defs>
      </svg>
      {text && <span>{text}</span>}
    </IconButton>
  );
}
