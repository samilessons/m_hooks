export default function View({ char }) {
  const { name, description, thumbnail, homepage, wiki } = char;
  let imgStyle = { objectFit: "cover" };
 
  if (thumbnail?.includes("image_not_available.jpg")) {
    imgStyle = { objectFit: "contain" };
  }

  return (
    <div className="randomchar__block">
      <img
        src={thumbnail}
        alt="Random character"
        className="randomchar__img"
        style={imgStyle}
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr"> {description} </p>
        <div className="randomchar__btns">
          <a
            href={homepage}
            target="_blank"
            className="button button__main"
          >
            <div className="inner">homepage</div>
          </a>
          <a
            href={wiki}
            target="_blank"
            className="button button__secondary"
          >
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
}