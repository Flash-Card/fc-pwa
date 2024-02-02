import { memo, useCallback, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { TabHead, NavTab, NavButton } from "components";
import { CardsTab } from "./cards";
import { LessonsTab } from "./lessons";
import { useDeck } from "./useDeck";
import { CreateCard } from "./create";
import styles from "./deck.module.scss";

interface ITab {
  id: string;
  title: string;
}

const TABS: ReadonlyArray<ITab> = [
  { id: "", title: "Lesson" },
  { id: "cards", title: "Cards" },
  { id: "quiz", title: "Quiz" },
];

const Deck = () => {
  const { cards, deck, onDeleteDeck, onEditDeck, onShareDeck, editForm } =
    useDeck();
  const navigate = useNavigate();

  const [isCreating, setState] = useState<boolean>(false);

  const toggleCreate = useCallback(() => setState((s) => !s), [useState]);

  const handleComplete = useCallback(
    (id: string) => {
      setState(false);
      navigate(`cards#${id}`);
    },
    [navigate]
  );

  const getPath = useCallback(({ id: tabId }: ITab) => [tabId].join("/"), []);

  const getTitle = useCallback(
    ({ title, id }: ITab) =>
      id === "cards" ? `${title} (${cards.length})` : title,
    [cards]
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>{deck.name}</h2>
      </header>
      <TabHead
        data={TABS}
        getPath={getPath}
        getKey={({ title }: ITab) => title}
        getTitle={getTitle}
      />
      {isCreating ? (
        <CreateCard onCancel={toggleCreate} onComplete={handleComplete} />
      ) : null}
      {editForm}
      <Routes>
        <Route
          index
          element={
            <>
              <LessonsTab cards={cards} cardsInLesson={deck.cardsInLesson} />
              <NavTab>
                <NavButton
                  title="Create"
                  onClick={toggleCreate}
                  icon="create"
                />
                <NavButton title="edit" onClick={onEditDeck} icon="edit" />
                <NavButton title="share" onClick={onShareDeck} icon="share" />
                <NavButton
                  title="delete"
                  onClick={onDeleteDeck}
                  icon="delete"
                />
              </NavTab>
            </>
          }
        />
        <Route path="cards" element={<CardsTab cards={cards} />} />
        <Route
          path="quiz"
          element={
            <LessonsTab cards={cards} cardsInLesson={deck.cardsInLesson} />
          }
        />
      </Routes>
    </div>
  );
};

export default memo(Deck);
