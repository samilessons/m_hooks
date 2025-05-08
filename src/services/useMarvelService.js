import useHtpp from "../hooks/http.hook";

const useMarvelService = () => {
  const { loading, error, request, clearError } = useHtpp();

  const BASE_URL = "https://marvel-server-zeta.vercel.app";
  const API_KEY = "d4eecb0c66dedbfae4eab45d312fc1df";
  // const BASE_URL = "https://gateway.marvel.com:443/v1/public";
  // const API_KEY = "7a2f90270b6303fe8a6acd07672c5bba";
  const BASE_OFFSET = 0;
  const BASE_LIMIT = 6;

  const transformResource = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description ? `${char.description.slice(0, 180)}...` : "There is no description",
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items
    };
  };

  const getAllCharacters = async (offset = BASE_OFFSET) => {
    const data = await request(`${BASE_URL}/characters?limit=${BASE_LIMIT}&offset=${offset}&apikey=${API_KEY}`);
    return data.data.results.map(transformResource);
  };

  const getCharacter = async (id = 5) => {
    const data = await request(`${BASE_URL}/characters/${id}?&apikey=${API_KEY}`);
    return transformResource(data.data.results[0]);
  };

  return { loading, error, clearError, getAllCharacters, getCharacter };
};

export default useMarvelService;