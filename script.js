const gameTitle = document.getElementById("game-title")
const scoreDisplay = document.getElementById("score")
// select #question-number  → store in questionNumber
// select #question-text    → store in questionText
// select #question-card    → store in questionCard
// select #answer-list      → store in answerList
// select #next-btn         → store in nextBtn
// select #end-screen       → store in endScreen
const questionNumber = document.getElementById("question-number")
const questionText = document.getElementById("question-text")
const questionCard = document.getElementById("question-card")
const answerList = document.getElementById("answer-list")
const nextBtn = document.getElementById("next-btn")
const endScreen = document.getElementById("end-screen")
const answerBtnsCollection = document.getElementsByClassName("answer-btn")
// select ".answer-btn" using querySelectorAll → store in answerBtnsNodeList
const answerBtnsNodeList = document.querySelectorAll(".answer-btn")
console.log("HTMLCollection:",answerBtnsCollection)
console.log("NodeList:",answerBtnsNodeList)
answerBtnsCollection.map    // → undefined
answerBtnsNodeList.forEach  // → ƒ forEach() { [native code] }
const btnsArray = Array.from(answerBtnsNodeList)
// or
const btnsArray2 = [...answerBtnsNodeList] // getElementsByClassName returns an ________.
// querySelectorAll returns a ________.
// To use .map() on either, convert with ________.