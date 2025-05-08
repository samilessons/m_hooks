import { useState, useEffect, useRef } from "react";

import useMarvelService from "../../services/useMarvelService.js";
import Loader from "../loader/Loader.jsx";
import Error from "../error/Error.jsx";

import "./_charList.scss";

const limit = 6;

export default function CharList({ onCharSelected }) {
  const [charList, setCharList] = useState([]);
  const [newCharLoading, setNewCharLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [charEnded, setCharEnded] = useState(false);

  const { loading, error, getAllCharacters, clearError } = useMarvelService();

  useEffect(() => {
    onRequest();
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewCharLoading(false) : setNewCharLoading(true);
    clearError();
    getAllCharacters(offset).then(onCharListLoaded);
  };

  const onCharListLoaded = (newCharList) => {
    let ended = false;

    if (newCharList.length < limit) {
      ended = true;
    }

    setCharList(charList => [...charList, ...newCharList]);
    setNewCharLoading(false);
    setOffset(offset => offset + limit);
    setCharEnded(ended);
  };

  const itemRefs = useRef([]);

  const focusOnItem = (id) => {
    itemRefs.current.forEach(item => item.classList.remove("char__item_selected"));
    itemRefs.current[id].classList.add("char__item_selected");
    itemRefs.current[id].focus();
  };

  function renderItems(arr) {
    return (
      <ul className="char__grid">
        {arr.map((char, i) => {
          return (
            <li
              tabIndex={0}
              ref={el => itemRefs.current[i] = el}
              key={i}
              className="char__item"
              onClick={() => {
                onCharSelected(char.id)
                focusOnItem(i)
              }}
              onKeyDown={e => {
                if (e.key === " " || e.key === "Enter") {
                  onCharSelected(char.id)
                  focusOnItem(i)
                }
              }}
            >
              <img
                src={char.thumbnail}
                alt={char.name}
                style={char.thumbnail.includes("image_not_available") ? { objectFit: "contain" } : { objectFit: "cover" }}
              />
              <div className="char__name">{char.name}</div>
            </li>
          );
        })}
      </ul>
    );
  };

  const errorView = error ? <Error /> : null;
  const loadingView = loading && !newCharLoading ? <Loader /> : null;
  const items = renderItems(charList);

  return (
    <div className="char__list">
      {errorView}
      {loadingView}
      {items}
      <button
        onClick={() => onRequest(offset)}
        disabled={newCharLoading || charEnded}
        className="button button__main button__long"
      >
        <div className="inner">
          {newCharLoading ? "Loading..." : charEnded ? "No More Characters" : "Load More"}
        </div>
      </button>
    </div>
  );
}