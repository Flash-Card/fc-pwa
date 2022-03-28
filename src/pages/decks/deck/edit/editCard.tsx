import { FC, memo, useCallback } from 'react';
import { Form } from 'react-final-form';
import { useAppDispatch } from 'domain/index';
import { addCard, ICard } from 'domain/decks';
import { Container } from 'pages/common/container';
import { FormCard } from '../../form';

type TFormData = Pick<ICard, 'back' | 'front'>;

interface IProps {
  item: ICard;
  onComplete(): void;
}

const EditCard: FC<IProps> = ({ item, onComplete }) => {
  const dispatch = useAppDispatch();

  const handleSubmit = useCallback(
    (values: TFormData) => {
      dispatch(addCard({ ...item, ...values }));
      onComplete();
    },
    [onComplete, dispatch],
  );

  return (
    <Container onClose={onComplete} name="Edit card" >
      <Form
        initialValues={item}
        onSubmit={handleSubmit}
        component={FormCard}
      />
    </Container>
  );
}

export default memo(EditCard);
