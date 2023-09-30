// Получение элемента с вопросами
const question = document.getElementById("quiz");
// Получения эелемента для checkBox
const opt = document.getElementById("opt");

let score = 0;

const resolvedQuestion = [];
const findQuest = [];

// Загрузка вопроса
function loadQues() {
  // Генирация рандомного числа
  const randomNumber = Math.floor(Math.random() * Questions.length);
  // Поиск рандомного числа в Объетке по ID
  const findQuestions = Questions.find((elem) => elem.id === randomNumber);

  findQuest.push(findQuestions);

  // Вывод вопроса и обнуление inputs
  question.textContent = findQuestions.question;
  opt.innerHTML = "";

  // Создания раздела с ответами на вопросы
  for (let i = 0; i < Questions[findQuestions.id].answers.length; i++) {
    const choice = document.createElement("input");
    const choiceLabel = document.createElement("label");
    const choiceSpan = document.createElement("span");

    choice.type = "radio";
    choice.name = "answer";
    choice.value = i;

    choiceSpan.textContent = Questions[findQuestions.id].answers[i].text;

    opt.appendChild(choiceLabel);
    choiceLabel.appendChild(choice);
    choiceLabel.appendChild(choiceSpan);
  }
}

// Добавление класса start for body для начало теста
function addClass() {
  const body = document.getElementById("body");
  body.classList.add("start");
  loadQues();
}

function loadScore() {
  const totalScore = document.getElementById("score");
  totalScore.textContent = `You scored ${score} out of ${Questions.length}`;
}

function nextQuestion() {
  if (resolvedQuestion < Questions.length - 1) {
    resolvedQuestion.push(findQuest[0].id);
    findQuest.pop();
    return loadQues();
  } else {
    document.getElementById("opt").remove();
    document.getElementById("quiz").remove();
    document.getElementById("submit").remove();
    loadScore();
  }
}

function checkAns() {
  const selectedAns = parseInt(
    document.querySelector('input[name="answer"]:checked').value
  );

  if (Questions[findQuest[0].answers[selectedAns].isCorrect]) {
    score++;
    console.log(scrore);
    nextQuestion();
  } else {
    nextQuestion();
  }
}
