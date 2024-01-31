import { FC, memo, useCallback, useMemo } from "react";
import { Form } from "react-final-form";
import omit from "lodash/fp/omit";
import get from "lodash/get";
import { useAppDispatch } from "domain/index";
import { EActionType, IDeckItem, CARDS_IN_LESSON } from "domain/decks";
import { Container } from "pages/common/container";

import { FormDeck } from "../form";

interface IProps {
  onComplete(): void;
  item: IDeckItem;
}

const EditDeck: FC<IProps> = ({ onComplete, item }) => {
  const dispatch = useAppDispatch();

  const metaDeck = useMemo(() => omit("cards")(item), [item]);

  const handleSubmit = useCallback(
    (values: IDeckItem) => {
      dispatch({
        type: EActionType.UPDATE_DECK,
        payload: {
          ...metaDeck,
          ...values,
          cardsInLesson: Number(get(values, CARDS_IN_LESSON, 3)),
        },
      });
      onComplete();
    },
    [item]
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
};

export default memo(EditDeck);
