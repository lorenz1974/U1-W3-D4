// **********************************************************
//
//                     FUNCTIONS DEFINITION
//
// **********************************************************

//
// Function to generate non-repeating random numbers
// https://www.quora.com/How-do-I-return-non-repeating-random-numbers-in-JavaScript
//
const getNonRepeatingRandomNumbers = (min, max) => {
  // Create an array with numbers from min to max
  const numbers = []
  for (let i = min; i <= max; i++) {
    numbers.push(i)
  }

  // Shuffle the array using Fisher-Yates algorithm
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[numbers[i], numbers[j]] = [numbers[j], numbers[i]] // Swap elements
  }

  return numbers // Return the shuffled array
}

//
// Funzione per lacreazione del tabellone
// Prende quattro parametri:
// - type: il tipo di tabellone, billBoard o userCard.
//         userCard deve essere seguito dal numero della card che ha scelto l'utente
//         ad esempio usercard-1 per la prima card, usercard-2 per la seconda etc.
// - cellValues: l'elenco dei valori delle celle. da 1 a 76 per il tabellone, 24 numeri casali per le userCard
// - appendTo: il nodo a cui appendere il tabellone
//
const createBoard = (type, cellValues, appendTo) => {
  console.log(type, cellValues, appendTo)
  for (let i = 0; i < cellValues.length; i++) {
    const numberCell = document.createElement('div')
    numberCell.classList.add('numberCell')
    numberCell.classList.add(type)
    numberCell.setAttribute('id', `${type}-${cellValues[i]}`)
    const numberValue = document.createElement('h3')
    numberValue.textContent = cellValues[i]
    // appendiamo l'h3 alla cella
    numberCell.appendChild(numberValue)
    // appendo il div alla section
    appendTo.appendChild(numberCell)
  }
}

//
// Funzione per creare la card dell'utente
// Utilizza a sua vola la funzione CreateBoard
//
const createUserCard = (cardNumber) => {
  // II Intercetto il div delle cards dell'utente
  const divUserCards = document.querySelector('#userCards')

  // Genera 24 numeri casuali per la prima card dell'utente
  cellValues = []
  cellValues = getNonRepeatingRandomNumbers(1, 76)
  cellValues = cellValues.slice(0, 24)
  // console.log(cellValues)

  // Creo il div della card dell'utente
  let userCardContainer = document.createElement('div')
  userCardContainer.classList.add('cardContainer')
  userCardContainer.setAttribute('id', `cardContainer${cardNumber}`)
  userCardContainer.innerHTML = `<h3>Cartella ${cardNumber}</h3>`
  divUserCards.appendChild(userCardContainer)

  // intercetto il DIV appena creato
  divJustCreated = document.querySelector(`#cardContainer${cardNumber}`)
  // Creo la card dell'utente
  createBoard(`userCard${cardNumber}`, cellValues, divJustCreated)
}

//
// Funzione per evidenziare il numero estratto
//
const markExtractedNumeber = (type, number) => {
  const extractedNumberDiv = document.querySelector(`#${type}-${number}`)

  // Nel caso in cui sulla card utente il numero non c'è, extractedNumberDiv sarà null e ritorna senza andare in errore
  if (extractedNumberDiv === null) {
    return
  }
  // Aggiungo la classe extractedNumber
  extractedNumberDiv.classList.add('extractedNumber')
}

//
//
// **********************************************************
//
//                        MAIN ROUTINE
//
// **********************************************************

//
// Prima preparo tutti i numeri casuali non ripetitivi da 1 a 76 in modo da non doverli
// generare in continuazione e poi dover controlalre se già estratti
//
const extractedNumbers = getNonRepeatingRandomNumbers(1, 76)
// console.log(extractedNumbers)

//
// Intercetto il div del tabellone e creo il tabellone
// il tabellone si chiama "billBoard"!!!
//
const divTabellone = document.querySelector('#tabellone')
// Genera i numeri sequenziali da 1 a 76 per il tabellone
let cellValues = []
for (let i = 1; i <= 76; i++) {
  cellValues.push(i)
}
//console.log(divTabellone)
createBoard('billBoard', cellValues, divTabellone)

// Nasconde il bottono "estrai" finchè non vengono generate le card dell'utente
// In questo modo non si possono estrarre numeri prima di aver creato le card utente
document.getElementById('btnEstrai').style.display = 'none'

//
// Creo un numero di card in base al selettore
// E poi lo disattivo per evitare che vengani rigenerate delle nuove card
//
const selectCardsNumber = document.getElementById('nCards')
selectCardsNumber.addEventListener('change', () => {
  // Leggo il valore del selettore e creo N card in base al valore
  let nCards = selectCardsNumber.value
  //console.log('nCards selected:', nCards)
  for (let i = 1; i <= parseInt(nCards); i++) {
    createUserCard(i)
  }

  // Disattivo il selettore così che non possano essere generate nuove card
  // e riattivo il pulsante Estrai così che si possa cominacire a giocare
  document.getElementById('numberOfCards').style.display = 'none'
  document.getElementById('btnEstrai').style.display = 'block'
})

//
// Assegno l'eventListener al bottone "estrai"
//
const buttonEstrai = document.querySelector('#btnEstrai')
buttonEstrai.addEventListener('click', () => {
  if (extractedNumbers.length === 0) {
    alert('Hai estratto tutti i numeri!')
    return
  }

  // Estraggo un numero casuale partendo dalla fine (pop ritorna il numero estretto. Santo POP!!!)
  const extractedNumber = extractedNumbers.shift() /// vado con shift di cui mi ero dimenticato
  //console.log(extractedNumber)

  // Cambio la classe al DIV del numero corrispondente a quello estratto
  // ... Lo faccio sia sul tabellone...
  markExtractedNumeber('billBoard', extractedNumber)
  const selectCardsNumber = document.getElementById('nCards')
  // ... sia su tutte le card dopo aver riletto il selettone (che ora è nascosto!)
  let nCards = selectCardsNumber.value
  for (let i = 1; i <= parseInt(nCards); i++) {
    markExtractedNumeber(`userCard${i}`, extractedNumber)
  }
})

//
// Assegno l'eventListener al bottone "Ricomincia"
//
const buttonRicomincia = document.getElementById('btnRicomincia')
buttonRicomincia.addEventListener('click', () => {
  // Ricarico la pagina
  location.reload()
})
