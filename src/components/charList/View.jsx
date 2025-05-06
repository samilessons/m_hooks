export default function View({ charList, onCharSelected, focusOnItem, setRef }) {
  return (
    <ul className="char__grid">
      {
        charList.map((char, i) => {
          return (
            <li
              ref={setRef}
              onClick={() => {
                onCharSelected(char.id)
                focusOnItem(i)
              }}
              key={char.id}
              className="char__item"
            >
              <img
                src={char.thumbnail}
                alt={char.name}
                style={char.thumbnail.includes("image_not_available") ? { objectFit: "contain" } : { objectFit: "cover" }}
              />
              <div className="char__name">{char.name}</div>
            </li>
          );
        })
      }
    </ul>
  );
}