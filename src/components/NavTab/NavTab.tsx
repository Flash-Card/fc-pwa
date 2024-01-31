import React, { FC, Key } from "react";
import "./nav-tab.scss";

interface NavTabProps {
  children: React.ReactElement[];
}

export const NavTab: FC<NavTabProps> = ({ children }) => {
  return (
    <ul className="nav-tab">
      {children.map((el) => (
        <li key={el.key} className="nav-tab__item">
          {el}
        </li>
      ))}
    </ul>
  );
};
