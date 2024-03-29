import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getData } from './utils/helpers';

import CategoryPage from './pages/CategoryPage';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import Notification from './components/Notification';
import SingleCast from './pages/SingleCast';
import './App.css';
import { CastMember, Character, Episode, TriviaQuestion } from './utils/types';
import SingleCharacter from './pages/SingleCharacter';
import SingleEpisode from './pages/SingleEpisode';

function App() {
  const [message, setMessage] = useState<string | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);

  useEffect(() => {
    const getAll = async () => {
      const jsonCast = await getData('cast');
      setCast(jsonCast);

      const jsonCharacters = await getData('characters');
      setCharacters(jsonCharacters);

      const jsonEpisodes = await getData('episodes');
      setEpisodes(jsonEpisodes);

      const jsonQuestions = await getData('trivia');
      setQuestions(jsonQuestions);
    };

    getAll();
  }, []);

  return (
    <div id='main-container'>
      <NavBar />
      <Notification message={message} setMessage={setMessage} />
      <div className='container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path={'/categories/:category'} element={<CategoryPage cast={cast} characters={characters} episodes={episodes} questions={questions} />} />
          <Route path={'/cast/:actorId'} element={<SingleCast cast={cast} characters={characters} />} />
          <Route path={'/characters/:characterId'} element={<SingleCharacter characters={characters} />} />
          <Route path={'episodes/:episodeId'} element={<SingleEpisode episodes={episodes} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
