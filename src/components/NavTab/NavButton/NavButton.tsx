import React from "react";
import { Icon, IconName } from "components";

import "./nav-button.scss";

interface INavButtonProps {
  title: string;
  onClick: () => void;
  icon: IconName;
}

export const NavButton: React.FC<INavButtonProps> = ({
  title,
  onClick,
  icon,
}) => {
  return (
    <button
      key={title}
      type="button"
      title={title}
      className="nav-button"
      onClick={onClick}
    >
      <Icon name={icon} size="lg" />
      <span className="nav-button__title">{title}</span>
    </button>
  );
};
