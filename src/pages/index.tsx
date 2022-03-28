import { memo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from 'pages/common/layout';
import { Decks, CreateDeck, Deck } from 'pages/decks';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Decks />} />
        <Route path='deck/add' element={<CreateDeck />} />
        <Route path='deck/:id/*' element={<Deck />} />
      </Routes>
    </Layout>
  )
}

export default memo(App);
