import { FC, memo, useCallback } from 'react';
import { Form } from 'react-final-form';
import { nanoid } from 'nanoid';
import { ICard } from 'domain/decks';
import { Container } from 'pages/common/container';
import { useDeck } from '../useDeck';
import { FormCard } from '../../form';

type TFormData = Pick<ICard, 'back' | 'front'>;

interface IProps {
  onComplete(id: string): void;
  onCancel(): void;
}

const CreateCard: FC<IProps> = ({ onCancel, onComplete }) => {
  const { deck, validateCard, addCard } = useDeck();

  const handleSubmit = useCallback(
    (values: TFormData) => {
      const id = nanoid(6);
      addCard({ ...values, id, deckId: deck.id });
      onComplete(id);
    },
    [onComplete, addCard],
  );

  return (
    <Container onClose={onCancel} name="Create Card">
      <Form<ICard>
        validate={validateCard}
        onSubmit={handleSubmit}
        component={FormCard}
      />
    </Container>
  );
}

export default memo(CreateCard);
