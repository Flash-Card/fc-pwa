export type IconName =
  | "share"
  | "open"
  | "create"
  | "edit"
  | "delete"
  | "pin"
  | "unpin"
  | "move"
  | "transfer";

export interface IconProps {
  name: IconName;
  className?: string;
  size?: "sm" | "md" | "lg";
}
