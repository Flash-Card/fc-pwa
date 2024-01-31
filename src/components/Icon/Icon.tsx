import { FC } from "react";
import cn from "classnames";
import "./icon.scss";
import { IconProps } from "./types";

export const Icon: FC<IconProps> = ({ className, name, size = "md" }) => {
  return (
    <i
      aria-hidden="true"
      style={
        {
          "--icon-image": `url('/images/icon/${name}.svg')`,
        } as React.CSSProperties
      }
      className={cn("icon", `icon--${size}`, `icon--${name}`, className)}
    />
  );
};
