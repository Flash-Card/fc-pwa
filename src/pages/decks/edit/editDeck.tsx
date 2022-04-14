import { FC, memo, useCallback, useMemo } from 'react';
import { Form } from 'react-final-form';
import omit from 'lodash/fp/omit';
import { useAppDispatch } from 'domain/index';
import { EActionType, IDeckItem } from 'domain/decks';
import { Container } from 'pages/common/container';

import { FormDeck } from '../form';

interface IProps {
  onComplete(): void;
  item: IDeckItem;
}

const EditDeck: FC<IProps> = ({ onComplete, item }) => {
  const dispatch = useAppDispatch();

  const metaDeck = useMemo(() => omit('cards')(item), [item]);

  const handleSubmit = useCallback(
    (values) => {
      dispatch({
        type: EActionType.UPDATE_DECK,
        payload: { ...metaDeck, ...values },
      });
      onComplete();
    },
    [item],
  );
  return (
    <Container onClose={onComplete} name="Edit deck">
      <Form
        component={FormDeck}
        initialValues={metaDeck}
        onSubmit={handleSubmit}
      />
    </Container>
  );
}

export default memo(EditDeck);