export default function View({ char }) {
  const { thumbnail, name, homepage, wiki, description, comics } = char;
  const imgStyle = thumbnail.includes('image_not_available') ? { objectFit: 'contain' } : { objectFit: 'cover' };
  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={imgStyle} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} target="_blank" rel="noreferrer" className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} target="_blank" rel="noreferrer" className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">
        {description ? description : 'There is no description'}
      </div>
      <div className="char__comics">
        {comics.length ? 'Comics:' : 'There is no comics'}
      </div>
      {
        comics.length ?
          <ul className="char__comics-list">
            {
              comics?.map((item, i) => {
                if (i > 9) return null;
                return (
                  <li key={i} className="char__comics-item">
                    <a href={`${item.resourceURI}/?apikey=7a2f90270b6303fe8a6acd07672c5bba`} target="_blank" rel="noreferrer">
                      {item.name}
                    </a>
                  </li>
                );
              })
            }
          </ul>
          :
          null
      }
    </>
  );
}