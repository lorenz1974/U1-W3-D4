// **********************************************************
//
//                     FUNTIONS' DEFINITIONS
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
//  Funzione per lacreazione del tabellone
//
const createBoard = (type, cells) => {
  for (let i = 0; i < cells; i++) {
    const numberCell = document.createElement('div')
    numberCell.classList.add('numberCell')
    numberCell.setAttribute('id', `${type}-${i}`)
    const numberValue = document.createElement('h3')
    numberValue.textContent = i + 1
    // appendiamo l'h3 alla cella
    numberCell.appendChild(numberValue)
    // appendo il div alla section
    divTabellone.appendChild(numberCell)
  }
}

//
// Funzione per evidenziare il numero estratto
//
const markExtractedNumeber = (type, number) => {
  const extractedNumberDiv = document.querySelector(`#${type}-${number - 1}`)
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
console.log(extractedNumbers)

//
// Intercetto il div del tabellone e creo il tabellone
//
const divTabellone = document.querySelector('#tabellone')
console.log(divTabellone)
createBoard('billBoard', 76)

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
  const extractedNumber = extractedNumbers.pop()
  console.log(extractedNumber)

  // Evidenzio come estratto il DIV del numero corrispondente
  markExtractedNumeber('billBoard', extractedNumber)
})
