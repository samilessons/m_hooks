export default class MarvelService {
  _BASE_URL = "https://marvel-server-zeta.vercel.app";
  _API_KEY = "d4eecb0c66dedbfae4eab45d312fc1df";
  // _BASE_URL = "https://gateway.marvel.com:443/v1/public";
  // _API_KEY = "7a2f90270b6303fe8a6acd07672c5bba";
  _BASE_OFFSET = 0;
  _BASE_LIMIT = 6;

  getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok || !res) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
  }

  getAllCharacters = async (offset = this._BASE_OFFSET) => {
    const data = await this.getResource(`${this._BASE_URL}/characters?limit=${this._BASE_LIMIT}&offset=${offset}&apikey=${this._API_KEY}`);
    return data.data.results.map(this._transformResource);
  }

  getCharacter = async (id) => {
    const data = await this.getResource(`${this._BASE_URL}/characters/${id}?&apikey=${this._API_KEY}`);
    return this._transformResource(data.data.results[0]);
  }

  _transformResource = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description ? `${char.description.slice(0, 180)}...` : "There is no description",
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    }
  }
}