console.log(window.Telegram.WebApp.initData);

// Questions that will be asked
const Questions = [
  {
    q: "Я бот? 1",
    a: [
      { text: "Нет", isCorrect: false },
      { text: "Да", isCorrect: true },
    ],
    id: 0,
  },
  {
    q: "Я бот? 2 ",
    a: [
      { text: "Нет", isCorrect: false },
      { text: "Да", isCorrect: true },
    ],
    id: 1,
  },
  {
    q: "Я бот? 3",
    a: [
      { text: "Нет", isCorrect: false },
      { text: "Да", isCorrect: true },
    ],
    id: 2,
  },
];

let currQuestion = 0;
let score = 0;

function loadQues() {
  const question = document.getElementById("ques");
  const opt = document.getElementById("opt");

  const randomNumber = Math.floor(Math.random() * Questions.length);
  const findQuestions = Questions.find((id) => id.id === randomNumber);

  question.textContent = findQuestions.q;
  opt.innerHTML = "";

  for (let i = 0; i < Questions[currQuestion].a.length; i++) {
    const choicesdiv = document.createElement("div");
    const choice = document.createElement("input");
    const choiceLabel = document.createElement("label");

    choice.type = "radio";
    choice.name = "answer";
    choice.value = i;

    choiceLabel.textContent = Questions[currQuestion].a[i].text;

    choicesdiv.appendChild(choice);
    choicesdiv.appendChild(choiceLabel);
    opt.appendChild(choicesdiv);
  }
}

loadQues();

function loadScore() {
  const totalScore = document.getElementById("score");
  totalScore.textContent = `You scored ${score} out of ${Questions.length}`;
}

function nextQuestion() {
  if (currQuestion < Questions.length - 1) {
    currQuestion++;
    loadQues();
  } else {
    document.getElementById("opt").remove();
    document.getElementById("ques").remove();
    document.getElementById("btn").remove();
    loadScore();
  }
}

function checkAns() {
  const selectedAns = parseInt(
    document.querySelector('input[name="answer"]:checked').value
  );

  if (Questions[currQuestion].a[selectedAns].isCorrect) {
    score++;
    nextQuestion();
  } else {
    nextQuestion();
  }
}
