import "./_appBanner.scss";

export default function AppBanner () {
  return (
    <div className="app__banner">
      <img src="/avengers.png" alt="Avengers" />
      <div className="app__banner-text">
        New comics every week!<br />
        Stay tuned!
      </div>
      <img src="/avengers-logo.png" alt="Avengers logo" />
    </div>
  );
}