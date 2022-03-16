import React, { FC } from 'react';
import { Header } from '../header';
import './layout.css';

interface IProps {
  children: React.ReactNode;
}

export const Layout: FC<IProps> = ({ children }) => {
  return (
    <>
      <Header />
      {
        children
      }
    </>
  );
}
