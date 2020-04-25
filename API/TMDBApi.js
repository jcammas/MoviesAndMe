// API/TMDBApi.js

const API_TOKEN = "8d8c00719306a2a0bba29939c6dbacdf";

//Récupération du film

export function getFilmsFromApiWithSearchedText (text, page) {
  const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + "&page=" + page
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

//Récupération de l'image du film

export function getImageFromApi (name) {
  return 'https://image.tmdb.org/t/p/w300' + name
}

// Récupération du détail d'un film

export function getFilmDetailFromApi (id) {
  return fetch('https://api.themoviedb.org/3/movie/' + id + '?api_key=' + API_TOKEN + '&language=fr')
    .then((response) => response.json())
    .catch((error) => console.error(error));
}