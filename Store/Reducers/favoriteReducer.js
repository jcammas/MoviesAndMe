// Store/Reducers/favoriteReducer.js

const initialState = { favoritesFilm: [] }

function toggleFavorite(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      const favoriteFilmIndex = state.favoritesFilm.findIndex(item => item.id === action.value.id)
      if (favoriteFilmIndex !== -1) {
        // Le film est déjà dans les favoris, on le supprime de la liste
        nextState = {
          ...state,
          favoritesFilm: state.favoritesFilm.filter( (item, index) => index !== favoriteFilmIndex)
        }
      }
      else {
        // Le film n'est pas dans les films favoris, on l'ajoute à la liste
        nextState = {
          ...state,
          favoritesFilm: [...state.favoritesFilm, action.value]
        }
      }
      return nextState || state
  default:
    return state
  }
}

export default toggleFavorite

/* utilisation de redux step by step :
    1. utilisateur clique sur le bouton favoris -> on appel tooglefavorite, ici on créée une action toggle favorite et une value = film favoris
    on fait passer l'action au store redux avec la fonction dispatch et c'est le store (reducer) qui va recevoir l'action et modifier le state (ajout ou suppression)
    2. le component film détail reçoit la nouvelle liste, la map à ses props et lance le cycle de vie updating pour se rerendre. */