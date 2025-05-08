import { useState } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharInfo from "../charInfo/CharInfo";
import CharList from "../charList/CharList";

import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";
import SingleComic from "../singleComic/SingleComic";
import Skeleton from "../skeleton/Skeleton";

import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

import vision from "../../assets/img/vision.png"

export default function App() {
  const [selectedChar, setSelectedChar] = useState(null);

  const onCharSelected = id => setSelectedChar(id);

  return (
    <div className="app">
      <AppHeader />
      <main>
        <ErrorBoundary>
          <RandomChar />
        </ErrorBoundary>
        <div className="char__content">
          <ErrorBoundary>
            <CharList onCharSelected={onCharSelected} />
          </ErrorBoundary>
          <ErrorBoundary>
            <CharInfo charId={selectedChar} />
          </ErrorBoundary>
        </div>
        <img className="bg-decoration" src={vision} alt="vision" />
      </main>
    </div>
  );
}