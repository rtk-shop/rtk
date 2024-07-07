import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useFormContext } from "react-hook-form";
import FilterIcon from "../../../../../public/assets/icons/filter.svg";
import SortIcon from "../../../../../public/assets/icons/sort.svg";

import styles from "./styles.module.scss";

interface ControlsProps {
  onFilterClick(): void;
}

export function Controls({ onFilterClick }: ControlsProps) {
  const {
    formState: { dirtyFields },
  } = useFormContext();

  return (
    <div className={styles.container}>
      <Button
        color="secondary"
        className={clsx(styles.control, styles.sortButton)}
        startIcon={
          <div className={clsx("svg-icon", styles.sortIcon)}>
            <SortIcon />
          </div>
        }
      >
        По умолчанию
      </Button>
      <Badge
        content={Object.keys(dirtyFields).length}
        className={styles.badge}
        dotClassName={styles.badgeDot}
      >
        <Button
          color="secondary"
          onClick={onFilterClick}
          className={clsx(styles.control, styles.filterButton)}
          startIcon={
            <div className={clsx("svg-icon", styles.filterIcon)}>
              <FilterIcon />
            </div>
          }
        >
          Фильтр
        </Button>
      </Badge>
    </div>
  );
}
