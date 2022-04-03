import { FC, memo, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from 'domain/index';
import { getDeckListRequest } from 'domain/decks';
import { Grid } from 'components/Grid';
import styles from './decks.module.scss';

const Decks: FC = () => {

  const disptch = useAppDispatch();

  useEffect(() => { disptch(getDeckListRequest()); }, []);
  
  const decks = useAppSelector(state => Object.values(state.decks).map(e => ({ title: e.name, ...e })));

  const createPath = useCallback((id) => ['deck', id].join('/'), []);

  return (
    <>
      <Grid list={decks} createPath={createPath} />
      <Link to='/deck/add' className={styles.add}>Create new Deck</Link>
    </>
  );
}

export default memo(Decks);
