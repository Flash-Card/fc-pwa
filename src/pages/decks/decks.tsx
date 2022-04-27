import { FC, memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { IDeckItem } from 'domain/decks';
import { useDecks } from './useDecks';
import { Grid, CardLink } from 'components/Grid';
import styles from './decks.module.scss';

const Decks: FC = () => {

  const { decks } = useDecks();

  const renderItem = useCallback(
    ({ name, id }: IDeckItem) => <CardLink title={name} path={['deck', id].join('/')} />,
    [],
  );

  return (
    <>
      <Grid list={decks} renderItem={renderItem} />
      <Link to='/deck/add' className={styles.add}>Create new Deck</Link>
    </>
  );
}

export default memo(Decks);
