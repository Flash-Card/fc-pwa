export type IconName = "share" | "open" | "create" | "edit" | "delete";

export interface IconProps {
  name: IconName;
  className?: string;
  size?: "sm" | "md" | "lg";
}
