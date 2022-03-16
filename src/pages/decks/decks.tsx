import { FC, memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'domain/index';
import { Grid } from 'components/Grid';
import styles from './decks.module.scss';

const Decks: FC = () => {
  
  const decks = useAppSelector(state => Object.values(state.decks).map(e => ({ title: e.name, ...e })));

  const createPath = useCallback((id) => ['deck', id].join('/'), []);

  return (
    <>
      <Grid list={decks} createPath={createPath} />
      <Link to='/deck/add' className={styles.add}>Add Deck</Link>
    </>
  );
}

export default memo(Decks);
