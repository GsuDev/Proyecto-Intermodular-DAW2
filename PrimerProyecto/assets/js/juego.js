
/**
 * Vamos a crear dos montones de tarjetas, uno de películas y otro de recursos relacionados:
 * 
 */
const NMOVIES = 5
const NELEMENTSPMOVIE = 3
const getMoviesDeck = () => {
  newGameButton.textContent = 'Empezar Juego'
  let movieDeck = []
  for (let i = 1; i <= NMOVIES; i++) {
    movieDeck.push("0" + i + "M")
  }
  //Barajamos con un método dela librería Underscore. Esta librería ofrece muchas funciones,
  //en este caso uso shuffle que recibe un arrayy lo devuelve de forma aleatoria
  movieDeck = _.shuffle(movieDeck)
  return movieDeck;
}

const getElementsDeck = () => {
  let elementDeck = []
  for (let i = 1; i <= NMOVIES; i++) {
    for (let j = 0; j < NELEMENTSPMOVIE; j++) {
      elementDeck.push("0" + i + "C" + j)
    }
  }
  //Barajamos
  elementDeck = _.shuffle(elementDeck)
  return elementDeck;
}

// Escoge una carta, la quita de la baraja y la devuelve
const getCard = (deck) => {
  // Si la baraja está vacía no devuelve nada
  if (deck.length === 0) {
    return undefined
  }

  // Quita la carta de la baraja y la guarda en la variable
  const picked = deck.pop()

  // Devuelve la carta seleccionada
  return picked
}

const newGameButton = document.getElementById('newGame')
const movieContainer = document.getElementById('pelicula-caratula')
const guessContainer = document.getElementById('adivinadas')
const elementsButton = document.getElementById('guessButton')
const elementsContainer = document.getElementById('elementos-pelicula')
let dragged
let tries = 10
let hits = 0
const triesMarker = document.getElementById('intentos')

// Función para generar una nueva película o reiniciar las imagenes
const newGame = () => {
  tries = 10
  triesMarker.innerHTML = tries
  hits = 0

  let movie = getCard(movieDeck)
  elementsContainer.innerHTML = ''
  elementDeck = getElementsDeck()
  console.log(elementDeck)

  if (!movie) {
    console.log('reinicio')
    movieDeck = getMoviesDeck()
    newGame()
    return
  }
  newGameButton.textContent = 'Siguiente Pelicula'
  movieContainer.innerHTML = `<img class="elemento" src="assets/movies/${movie}.jpg" alt="">`

  guessContainer.innerHTML = ''

  for (let i = 0; i < 3; i++) {
    let div = document.createElement('div')
    div.className = 'elemento drop-zone'
    // div.setAttribute('draggable') = 'false'

    div.addEventListener('dragover', e => e.preventDefault()) // Necesario
    div.addEventListener('drop', e => {
      e.preventDefault()
      if (movie.slice(0, 2) === dragged.id.slice(0, 2)) {
        dragged.className = 'elemento'

        div.outerHTML = dragged.outerHTML
        elementsContainer.removeChild(dragged)

        if (++hits >= 3) {
          
          setTimeout(() => { alert("Has ganado") }, 100)

          elementDeck = []
          elementsContainer.innerHTML = ''

        }
        console.log('aciertos ',hits)
      } else {

        triesMarker.innerHTML = --tries
        if (tries < 1) {
          setTimeout(() => { alert("Has perdido") }, 100)

          elementDeck = []
          elementsContainer.innerHTML = ''
        }
      }

    })

    guessContainer.appendChild(div)
  }



}

const addCharacter = () => {

  let character = getCard(elementDeck)
  if (!character) {
    console.log('Se acabó el deck de personajes')
    return
  }

  let div = document.createElement('div')
  div.className = 'elemento superpuesto'
  div.setAttribute('draggable', 'true')
  div.id = character
  div.innerHTML = `<img class="recurso" src="./assets/characters/${character}.jpg" alt="" draggable="false">`

  // Manejador de cuando se pincha para empezar a arrastrar
  div.addEventListener('dragstart', (ev) => {
    console.log(`Empieza a arrastrarse ${character}`)
    dragged = ev.target
  })


  elementsContainer.appendChild(div)

}

let movieDeck = getMoviesDeck()
let elementDeck = getElementsDeck()


newGameButton.addEventListener('click', newGame)
elementsButton.addEventListener('click', addCharacter)

