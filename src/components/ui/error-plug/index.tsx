import React from "react";
import Image from "next/image";

import styles from "./styles.module.scss";

export function ErrorPlug() {
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.imageWrapper}>
          <Image
            width={200}
            height={100}
            src="/assets/asset_2.svg"
            alt="asset 2"
          />
        </div>
        <h1 className={styles.title}>Не удалось получить данные</h1>
        <p className={styles.subTitle}>попробуйте перезагрузить страницу</p>
      </div>
    </div>
  );
}
