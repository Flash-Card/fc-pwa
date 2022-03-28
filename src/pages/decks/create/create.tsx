import { memo, useCallback } from 'react';
import { Form } from 'react-final-form';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
import { addDeck } from 'domain/decks';
import { useAppDispatch } from 'domain/index';
import styles from './create-deck.module.scss';
import { FormDeck } from '../form';

const CreateDeck = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = useCallback(
    (values) => {
      dispatch(addDeck({ ...values, id: nanoid(6) }));
      navigate('/');
    },
    [navigate, dispatch],
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create Deck</h2>
      <Form
        onSubmit={handleSubmit}
        component={FormDeck}
      />
    </div>
  );
}

export default memo(CreateDeck);
