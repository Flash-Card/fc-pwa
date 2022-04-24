import { FC, memo } from 'react';
import { Link } from 'react-router-dom';

interface ILinkItemProps {
  title: string;
  to: string;
  onClick?(): void;
}

const LinkItem: FC<ILinkItemProps> = ({ title, to, onClick }) => {
  return (
    <Link to={to} className='view-list__link' onClick={onClick}>{title}</Link>
  );
}

export default memo(LinkItem);
