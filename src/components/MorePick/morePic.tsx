import { FC, memo, useCallback, useRef, useMemo } from "react";
import cx from "classnames";
import styles from "./more-pic.module.scss";

enum EAction {
  CANCEL = "CANCEL",
}

export interface IPickerItem<T extends string = string> {
  value: T;
  title: string;
}

interface IProps {
  list: ReadonlyArray<IPickerItem>;
  onSelect(data: IPickerItem): void;
  className?: string;
}

const MorePic: FC<IProps> = ({ list, onSelect, className }) => {
  const selector = useRef<HTMLSelectElement | null>(null);

  const optByVAlue = useMemo<Record<string, IPickerItem>>(
    () => list.reduce((a, v) => ({ ...a, [v.value]: v }), {}),
    [list]
  );

  const handleChange = useCallback(() => {
    if (selector.current) {
      const item = optByVAlue[selector.current.value];
      item && onSelect(item);
      selector.current.value = EAction.CANCEL;
    }
  }, [onSelect, optByVAlue]);

  return (
    <select
      className={cx(styles.pick, className)}
      onChange={handleChange}
      ref={selector}
      title="More actions"
    >
      <option value={EAction.CANCEL} defaultChecked>
        Cancel
      </option>
      {list.map((e) => (
        <option key={e.value} value={e.value}>
          {e.title}
        </option>
      ))}
    </select>
  );
};

export default memo(MorePic);
