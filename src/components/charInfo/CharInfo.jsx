import { useState, useEffect } from "react";
import useMarvelService from "../../services/useMarvelService.js";
import Loader from "../loader/Loader.jsx";
import Error from "../error/Error.jsx";
import Skeleton from "../skeleton/Skeleton.jsx";
import View from "./View.jsx";

import "./_charInfo.scss";

export default function CharInfo({charId}) {
  const [char, setChar] = useState(null);
  const { loading, error, getCharacter, clearError } = useMarvelService();

  useEffect(() => {
    updateChar();
  }, [charId]);

  const updateChar = () => {
    if (!charId) return;

    clearError();
    getCharacter(charId).then(onCharLoaded);
  }

  const onCharLoaded = (char) => setChar(char);

  const skeletonView = char || loading || error ? null : <Skeleton />
  const errorView = error ? <Error /> : null;
  const loadingView = loading ? <Loader /> : null;
  const charView = !(loading || error || !char) ? <View char={char} /> : null;
  
  return (
    <div className="char__info">
      {skeletonView}
      {errorView}
      {loadingView}
      {charView}
    </div>
  );
}