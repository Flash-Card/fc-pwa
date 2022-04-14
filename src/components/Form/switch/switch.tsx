import { FC, memo } from 'react';
import { FieldRenderProps } from 'react-final-form';
import cx from 'classnames';
import styles from './switch.module.scss';

type TInput = Omit<JSX.IntrinsicElements['input'], 'type'>;

interface IProps extends TInput {
  label: string | JSX.Element;
  className?: string;
  error?: string;
}

const Switch: FC<IProps> = ({ label, error, className, ...intrinsicProps }) => {
  return (
    <>
      <label className={cx(styles.container, className)}>
        <input
          className={styles.input}
          {...intrinsicProps}
          type="checkbox"
        />
        <span className={styles.label}>{label}</span>
      </label>
      {error}
    </>
  );
};

const SwitchField: FC<FieldRenderProps<string> & IProps> = (props) => {
  const { input, meta, forceError, ...rest } = props;
  return (
    <Switch {...input} {...rest} />
  );
};

export default memo(SwitchField);