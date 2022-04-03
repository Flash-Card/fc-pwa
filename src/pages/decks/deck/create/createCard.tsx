import { FC, memo, useCallback } from 'react';
import { Form } from 'react-final-form';
import { nanoid } from 'nanoid';
import { useAppDispatch } from 'domain/index';
import { addCard, ICard } from 'domain/decks';
import { Container } from 'pages/common/container';
import { useDeck } from '../useDeck';
import { FormCard } from '../../form';

type TFormData = Pick<ICard, 'back' | 'front'>;

interface IProps {
  onComplete(id: string): void;
  onCancel(): void;
}

const CreateCard: FC<IProps> = ({ onCancel, onComplete }) => {
  const dispatch = useAppDispatch();
  const { deck } = useDeck();

  const handleSubmit = useCallback(
    (values: TFormData) => {
      const id = nanoid(6);
      dispatch(addCard({ ...values, id, deckId: deck.id }));
      onComplete(id);
    },
    [onComplete, dispatch],
  );

  return (
    <Container onClose={onCancel} name="Create Card">
      <Form
        onSubmit={handleSubmit}
        component={FormCard}
      />
    </Container>
  );
}

export default memo(CreateCard);
