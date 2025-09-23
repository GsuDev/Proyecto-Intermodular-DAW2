/**
 * Vamos a crear dos montones de tarjetas, uno de películas y otro de recursos relacionados:
 * 
 */
const NMOVIES = 5
const NELEMENTSPMOVIE = 3
const getMoviesDeck = () => {
  let movieDeck = []
  for (let i = 1; i <= NMOVIES; i++) {
    movieDeck.push("0" + i + "M")
  }
  //Barajamos con un método dela librería Underscore. Esta librería ofrece muchas funciones,
  //en este caso uso shuffle que recibe un arrayy lo devuelve de forma aleatoria
  //movieDeck = _.shuffle(movieDeck)
  return movieDeck;
}

const getElementsDeck = () => {
  let elementDeck = []
  for (let i = 1; i <= NMOVIES; i++) {
    for (let j = 1; j <= NELEMENTSPMOVIE; j++) {
      elementDeck.push("0" + i + "C" + j)
    }
  }
  //Barajamos
  //elementDeck = _.shuffle(elementDeck)
  return elementDeck;
}

// Escoge una carta, la quita de la baraja y la devuelve
const getCard = (deck) => {
  // Si la baraja está vacía no devuelve nada
  if (deck.lenght == 0) {
    return
  }

  // Genera un indice de la baraja aleatorio
  const randomIndex = Math.floor(Math.random() * deck.lenght)

  // Quita la carta de la baraja y la guarda en la variable
  const picked = deck.splice(randomIndex, 1)[0]

  // Devuelve la carta seleccionada
  return picked
}

const newGameButton = document.getElementById('newGame')
const movieContainer = document.getElementById('pelicula-caratula')


const newGame = () => {
  let movie = getCard(movieDeck)
  movieContainer.innerHTML += `<img class="elemento" src="assets/movies/${movie}.jpg" alt="">`
}
newGameButton.addEventListener('click', newGame)

let movieDeck = getMoviesDeck()
let elementDeck = getElementsDeck()

