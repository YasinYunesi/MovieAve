export const API_KEY = "dfc5ccc0e3fc42088db65afa40195ddd";
export const baseURL = "https://api.themoviedb.org/3";
export const baseImgURL = "https://image.tmdb.org/t/p/original";

// the APIs
export const fetchAction = `${baseURL}/discover/movie?api_key=${API_KEY}&with_genres=28`;
export const fetchComedy = `${baseURL}/discover/movie?api_key=${API_KEY}&with_genres=35`;
export const fetchHorror = `${baseURL}/discover/movie?api_key=${API_KEY}&with_genres=27`;
export const fetchSci_fi = `${baseURL}/discover/movie?api_key=${API_KEY}&with_genres=878`;
export const fetchAnimation = `${baseURL}/discover/movie?api_key=${API_KEY}&with_genres=16`;
export const fetchDrama = `${baseURL}/discover/movie?api_key=${API_KEY}&with_genres=18`;
export const fetchNetflixOriginals = `${baseURL}/discover/tv?api_key=${API_KEY}&with_network=213`;
export const fetchRomance = `${baseURL}/discover/movie?api_key=${API_KEY}&with_genres=10749`;
export const fetchTopRated = `${baseURL}/movie/top_rated?api_key=${API_KEY}&language=en-us`;
export const fetchTrending = `${baseURL}/trending/all/week?api_key=${API_KEY}&language=en-us`;
