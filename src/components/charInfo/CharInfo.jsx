import { useState, useEffect } from "react";
import MarvelService from "../../services/MarvelService";
import Loader from "../loader/Loader.jsx";
import Error from "../error/Error.jsx";
import Skeleton from "../skeleton/Skeleton.jsx";
import View from "./View.jsx";

import "./_charInfo.scss";

export default function CharInfo({charId}) {
  const [char, setChar] = useState(null);
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);

  const marvelService = new MarvelService();

  useEffect(() => {
    updateChar();
  }, [charId]);

  const updateChar = () => {
    if (!charId) return;

    onCharLoading();

    marvelService.getCharacter(charId)
      .then(onCharLoaded)
      .catch(onError);
  }

  const onCharLoaded = (char) => {
    setChar(char);
    setIsLoader(false);
  }

  const onCharLoading = () => setIsLoader(true);

  const onError = () => {
    setIsError(true);
    setIsLoader(false);
  }

  const skeletonView = char || isLoader || isError ? null : <Skeleton />
  const errorView = isError ? <Error /> : null;
  const loadingView = isLoader ? <Loader /> : null;
  const charView = !(isLoader || isError || !char) ? <View char={char} /> : null;
  
  return (
    <div className="char__info">
      {skeletonView}
      {errorView}
      {loadingView}
      {charView}
    </div>
  );
}