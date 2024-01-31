import { FC, memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { updateCard, ICard, IDeckItem } from "domain/decks";
import { Grid, CardButton } from "components/Grid";
import { Container } from "pages/common/container";
import { useDecks } from "../../useDecks";

interface IProps {
  item: ICard;
  onComplete(): void;
}

const TransferCard: FC<IProps> = ({ onComplete, item }) => {
  const { decks, dispatch } = useDecks();
  const navigate = useNavigate();

  const handleTransfer = useCallback(
    (deckId: string) => () => {
      dispatch(updateCard({ ...item, deckId }));
      navigate(`/deck/${deckId}/cards#${item.id}`, { replace: true });
      onComplete();
    },
    [dispatch, navigate]
  );

  const renderItem = useCallback(
    ({ id, name }: IDeckItem) => (
      <CardButton title={name} onClick={handleTransfer(id)} />
    ),
    []
  );

  return (
    <Container onClose={onComplete} name="Transfer card">
      <Grid list={decks} renderItem={renderItem} />
    </Container>
  );
};

export default memo(TransferCard);
