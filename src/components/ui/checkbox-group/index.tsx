import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapse, CollapseHead } from "@/components/ui/collapse";
import { useFormContext } from "react-hook-form";
import styles from "./styles.module.scss";

type optionType = {
  value: string;
  label: string;
};

interface CheckBoxGroupProps {
  name: string;
  title: string;
  options: Array<optionType>;
}

export function CheckBoxGroup({ title, options, name }: CheckBoxGroupProps) {
  const { register } = useFormContext();
  const [isCollapsed, setCollapsed] = useState(true);

  const handleCollapse = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <CollapseHead
        title={title}
        collapsed={isCollapsed}
        onCollapse={handleCollapse}
      />
      <Collapse open={isCollapsed}>
        <fieldset className={styles.fieldset}>
          {options.map(({ label, value }) => (
            <div key={value}>
              <Checkbox
                name={name}
                label={label}
                value={value}
                register={register}
              />
            </div>
          ))}
        </fieldset>
      </Collapse>
    </div>
  );
}
