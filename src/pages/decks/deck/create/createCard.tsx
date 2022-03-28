import { FC, memo, useCallback } from 'react';
import { Form } from 'react-final-form';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'domain/index';
import { addCard, ICard } from 'domain/decks';
import { useDeck } from '../useDeck';
import { FormCard } from '../../form';
import styles from './create-card.module.scss';

type TFormData = Pick<ICard, 'back' | 'front'>;

const CreateCard: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { deck } = useDeck();

  const handleSubmit = useCallback(
    (values: TFormData) => {
      dispatch(addCard({ ...values, id: nanoid(6), deckId: deck.id }));
      navigate(`/deck/${deck.id}/cards`);
    },
    [navigate, dispatch],
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create Card in <b>{deck.name}</b></h2>
      <Form
        onSubmit={handleSubmit}
        component={FormCard}
      />
    </div>
  );
}

export default memo(CreateCard);
