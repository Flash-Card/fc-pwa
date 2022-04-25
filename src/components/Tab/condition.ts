import { FC, memo, ReactElement } from 'react';

interface IConditionProps {
  when: boolean;
  children: ReactElement;
}

const Condition: FC<IConditionProps> = ({ when, children }) => {
  return when ? children : null;
}

export default memo(Condition);
