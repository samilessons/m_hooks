import { useState, useEffect } from "react";

import MarvelService from "../../services/MarvelService.js";
import Loader from "../loader/Loader.jsx";
import Error from "../error/Error.jsx";
import View from "./View.jsx";

import './_randomChar.scss';
import mjolnir from "../../assets/img/mjolnir.png"

export default function RandomChar() {
  const [char, setChar] = useState({});
  const [isLoader, setIsLoader] = useState(true);
  const [isError, setIsError] = useState(false);

  const marvelService = new MarvelService();
  
  useEffect(() => {
    updateChar();

    const timerID = setInterval(updateChar, 60000);

    return () => {
      clearInterval(timerID);
    }
  }, []);

  const onCharLoaded = (char) => {
    setChar(char);
    setIsLoader(false);
  }

  const onError = () => {
    setIsError(true);
    setIsLoader(false);
  }

  const updateChar = () => {
    // const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    const id = Math.floor(Math.random() * (20 - 1) + 1);
    setIsLoader(true);
    marvelService.getCharacter(id)
      .then(onCharLoaded)
      .catch(onError)
  }

  const errorView = isError ? <Error /> : null;
  const loadingView = isLoader ? <Loader /> : null;
  const charView = !(isLoader || isError) ? <View char={char} /> : null;
  return (
    <div className="randomchar">
      {errorView}
      {loadingView}
      {charView}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!<br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">
          Or choose another one
        </p>
        <button
          onClick={updateChar}
          className="button button__main"
        >
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
}