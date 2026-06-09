const questions = [
  {
    text: "Who invented the World Wide Web?",
    answers: [
      "Tim Berners-Lee",
      "Bill Gates",
      "Linus Torvalds",
      "Ada Lovelace"
    ],
    correct: 0  // index of the correct answer in the answers array
  },
  {
    text: "What does the 'DOM' stand for in web development?",
    answers: [
      "Digital Object Management",
      "Document Object Model",
      "Data Operation Module",
      "Direct Original Media"
    ],
    correct: 1
  },
  {
    text: "Which programming language was created in 10 days in 1995?",
    answers: [
      "Java",
      "Python",
      "JavaScript",
      "C++"
    ],
    correct: 2
  },
  {
    text: "Which HTML element is the correct wrapper for an individual list item?",
    answers: [
      "<ul>",
      "<ol>",
      "<list>",
      "<li>"
    ],
    correct: 3
  },
  {
    text: "What CSS property is used to change the background color of an element?",
    answers: [
      "color",
      "background-color",
      "border-color",
      "bgcolor"
    ],
    correct: 1
  }
  // ...four more
]


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
gameTitle.textContent = "⚡ Quick Fire Trivia"
console.log("First question:", questionText.textContent)
questionNumber.textContent = questionNumber.textContent.toUpperCase()
const firstBtn = answerBtnsNodeList[0]
const firstLi = firstBtn.parentElement

console.log("The first button:", firstBtn)
console.log("Its parent <li>:", firstLi)
console.log("The <ul> that holds all buttons:", firstLi.parentElement)
questionCard.classList.add("answered")
// Look at the browser — does the card look different?
questionCard.classList.remove("answered")

// Back to normal
let currentIndex = 0
let score = 0
function loadQuestion(index){
    
    const currentQuestion = questions[index]
    questionNumber.textContent = `Question ${index + 1} of ${questions.length}`;
    questionText.textContent = currentQuestion.text;
    Array.from(answerBtnsNodeList).forEach((button, btnIndex) => {
        button.textContent = currentQuestion.answers[btnIndex];
        button.className = "answer-btn";
    });

  // 5. Hide the next button
    nextBtn.classList.add("hidden");

  // 6. Remove the "answered" class from questionCard
    questionCard.classList.remove("answered");


    
}
loadQuestion(0);
// ==========================================
// Phase 4: Make It Interactive
// ==========================================

answerList.addEventListener("click", (event) => {
  // 1. If the click was not on a BUTTON element, return early and do nothing
  if (event.target.tagName !== "BUTTON") return;

  // Log both to observe the difference in DevTools
  console.log("event.target (Clicked element):", event.target);
  console.log("event.currentTarget (Element with listener):", event.currentTarget);

  // 2. Store the clicked button and figure out which index it is in the list
  const clickedBtn = event.target;
  const btnIdx = Array.from(answerBtnsNodeList).indexOf(clickedBtn);

  // 3. Get the correct answer index from the current question in the data array
  const currentQuestion = questions[currentIndex];
  const correctIdx = currentQuestion.correct;

  // 4. Compare: did the player pick the right one?
  if (btnIdx === correctIdx) {
    clickedBtn.classList.add("correct");
    score++;
    scoreDisplay.textContent = score;
  } else {
    clickedBtn.classList.add("wrong");
    // Reveal the correct answer
    answerBtnsNodeList[correctIdx].classList.add("correct");
  }

  // 5. Disable all four answer buttons so the player can't change their answer
  Array.from(answerBtnsNodeList).forEach((button) => {
    button.classList.add("disabled");
  });

  // 6. Add "answered" to questionCard and remove "hidden" from nextBtn
  questionCard.classList.add("answered");
  nextBtn.classList.remove("hidden");
});

// Why does clicking a button inside #answer-list trigger this listener?
// Answer: Event Bubbling. When an event happens on an element, it triggers handlers on itself first, then bubbles straight up to its parent, grandparent, and ancestors.
//
// What is the difference between event.target and event.currentTarget here?
// event.target        → The exact, specific element that was clicked (the individual <button>).
// event.currentTarget → The element that holds the active event listener wrapper (the parent <ul>).


// ==========================================
// Phase 5: Move to the Next Question
// ==========================================

nextBtn.addEventListener("click", () => {
  // 1. Increment currentIndex
  currentIndex++;

  // 2. If there are more questions left, load the next one
  if (currentIndex < questions.length) {
    loadQuestion(currentIndex);
  } else {
    // 3. Otherwise the game is over
    showEndScreen();
  }
});

function showEndScreen() {
  // 1. Hide the question card
  questionCard.classList.add("hidden");

  // 2. Show the end screen
  endScreen.classList.remove("hidden");

  // 3. Create an <h2> and set its textContent to show the final score
  const scoreHeader = document.createElement("h2");
  scoreHeader.textContent = `You scored ${score} out of ${questions.length}`;

  // 4. Create a <p> for an encouragement message
  const message = document.createElement("p");
  if (score === questions.length) {
    message.textContent = "🏆 Perfect score! You're a DOM master!";
  } else if (score >= questions.length / 2) {
    message.textContent = "🎉 Great job! You really know your web development tech.";
  } else {
    message.textContent = "📚 Keep practicing! Review the concepts and try again.";
  }

  // 5. Create a <button>, set its id to "restart-btn" and its textContent to "Play Again"
  const restartBtn = document.createElement("button");
  restartBtn.id = "restart-btn";
  restartBtn.textContent = "Play Again";

  // 6. Append all three elements to endScreen
  endScreen.appendChild(scoreHeader);
  endScreen.appendChild(message);
  endScreen.appendChild(restartBtn);
}


// ==========================================
// Phase 6: Restart
// ==========================================

endScreen.addEventListener("click", (event) => {
  // 1. Return early if the clicked element is not the restart button
  if (event.target.id !== "restart-btn") return;

  // Think: why can't we just do document.getElementById("restart-btn") at the top of the file?
  // Answer: Because it doesn't exist when the script loads! It is dynamically generated in memory later by showEndScreen().

  // 2. Reset both state variables to 0 and update header layout tracking
  score = 0;
  currentIndex = 0;
  scoreDisplay.textContent = score;

  // 3. Clear everything showEndScreen built
  endScreen.innerHTML = "";

  // 4. Bring the question card back and hide end screen
  endScreen.classList.add("hidden");
  questionCard.classList.remove("hidden");

  // 5. Load the first question
  loadQuestion(currentIndex);
});