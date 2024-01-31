import { FC, memo, useCallback } from "react";
import { Link } from "react-router-dom";
import { IDeckItem } from "domain/decks";
import { useDecks } from "./useDecks";
import { Grid, CardLink, NavTab, Icon, BrowsFile, readFiles } from "components";

function renderItem({ name, id }: IDeckItem) {
  return <CardLink title={name} path={["deck", id].join("/")} />;
}

const Decks: FC = () => {
  const { decks, appendDeck } = useDecks();

  const handleFiles = useCallback(async (files: FileList) => {
    const sharedMaybeDecks = await readFiles(files);
    sharedMaybeDecks.forEach(appendDeck);
  }, []);

  return (
    <>
      <Grid list={decks} renderItem={renderItem} />
      <NavTab>
        <Link key="create" to="deck/add">
          <Icon name="create" size="lg" />
        </Link>
        <BrowsFile accept=".fcdeck" key="open" handleFiles={handleFiles}>
          <Icon name="open" size="lg" />
        </BrowsFile>
      </NavTab>
    </>
  );
};

export default memo(Decks);
