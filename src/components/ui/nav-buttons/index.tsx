import React from "react";
import clsx from "clsx";
import { IconButton } from "@/components/ui/icon-button";
import ArrowIcon from "../../../../public/assets/icons/expand-arrow.svg";

import styles from "./styles.module.scss";

interface NavButtonsProps {
  onPrev(): void;
  onNext(): void;
}

export function NavButtons({ onPrev, onNext }: NavButtonsProps) {
  return (
    <>
      <IconButton
        onClick={onPrev}
        disableRipple
        className={clsx(styles.navigationButton, styles.prevButton)}
      >
        <div className={clsx("svg-icon", styles.prevButtonIcon)}>
          <ArrowIcon />
        </div>
      </IconButton>
      <IconButton
        onClick={onNext}
        disableRipple
        className={clsx(styles.navigationButton, styles.nextButton)}
      >
        <div className={clsx("svg-icon", styles.nextButtonIcon)}>
          <ArrowIcon />
        </div>
      </IconButton>
    </>
  );
}
