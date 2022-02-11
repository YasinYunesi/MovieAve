# Movie ave

Hey, I'm Yasin Yunesi. A React JS developer. Recently I've created a movie app called
MovieAve which gives you a complete information about any movie you could think of. You
can even add a movie to your favorites list or add them to watchLater list to check them
out later.

## Technologies

- React JS (Javascript library)
- TMDB API (Complete and powerful movie API)
- Firebase (Authentication , Signing methods & Realtime database)
- Bootstrap (Styling and positioning)
- Sass (Unique designing)

## API Reference

#### Base URL

```http
  "https://api.themoviedb.org/3"
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get movies (e.g Trending)

```http
  GET ${baseURL}/trending/all/week?api_key=${API_KEY}&language=en-us
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Search movie

```http
  GET ${baseURL}/search/movie?api_key=${API_KEY}&query=${query}
```

| Parameter | Type     | Description                          |
| :-------- | :------- | :----------------------------------- |
| `api_key` | `string` | **Required**. Your API key           |
| `query`   | `string` | **Required**. The word to search for |

## Appendix

- In some countries it may be essential to have a VPN connection
- Visit the website at [movie-ave.vercel.app](https://movie-ave.vercel.app/)

## Authors

- [@Yasin-Yunesi](https://findyasinyunesi.vercel.app/)
