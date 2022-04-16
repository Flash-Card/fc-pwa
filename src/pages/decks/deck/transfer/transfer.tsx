import { FC, memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateCard, ICard } from 'domain/decks';
import { Grid, CardButton } from 'components/Grid';
import { Container } from 'pages/common/container';
import { useDecks } from '../../useDecks';

interface IProps {
  item: ICard;
  onComplete(): void;
}

const TransferCard: FC<IProps> = ({ onComplete, item }) => {
  const { decks, disptch } = useDecks();
  const navigate = useNavigate()

  const handleTransfer = useCallback(
    (deckId) => () => {
      disptch(updateCard({ ...item, deckId }));
      navigate(`/deck/${deckId}/cards#${item.id}`, { replace: true });
      onComplete();
    },
    [disptch, navigate],
  );

  const renderItem = useCallback(
    ({ id, name }) => <CardButton title={name} onClick={handleTransfer(id)} />,
    [],
  );

  return (
    <Container onClose={onComplete} name="Transfer card">
      <Grid list={decks} renderItem={renderItem} />
    </Container>
  );
}

export default memo(TransferCard);
