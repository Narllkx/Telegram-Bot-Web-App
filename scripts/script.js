// Получение элемента с вопросами
const question = document.getElementById("quiz");
// Получения эелемента для checkBox
const opt = document.getElementById("opt");
const cont = document.getElementById("cont");

// на сколько секундах ставим таймер
const timer = 99999999999;
// запущен таймер или нет
started = false;

let score = 0;

const resolvedQuestion = [];
const findQuest = [];

// Загрузка вопроса
function loadQues() {
  // Генирация рандомного числа
  const randomNumber = Math.floor(Math.random() * Questions.length);
  // Поиск рандомного числа в Объетке по ID
  const findQuestions = Questions.find((elem) => elem.id === randomNumber);
  const copyOrNot = resolvedQuestion.includes(findQuestions.id);

  if (resolvedQuestion.length == Questions.length) {
    loadScore();
    return true;
  }
  if (copyOrNot == true) {
    loadQues();
  }
  if (copyOrNot == false) {
    findQuest.push(findQuestions);
    question.textContent = findQuestions.question;
  }

  // Вывод вопроса и обнуление inputs
  opt.innerHTML = "";

  startTimer();
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
  document.getElementById("opt").remove();
  document.getElementById("quiz").remove();
  document.getElementById("submit").remove();
  document.getElementById("submit-loadscore").remove();

  const totalScore = document.getElementById("score");
  const scorePerCent = Math.round((100 * score) / Questions.length);

  if (scorePerCent >= 70) {
    totalScore.innerHTML = `Вы успешно прошли тест! <br> Тест пройден на ${scorePerCent}%`;
  } else {
    totalScore.innerHTML = `Увы но вы не прошли тест :(  <br> Тест пройден на ${scorePerCent}%`;
  }
}

function checkAns() {
  const selectedAns = parseInt(
    document.querySelector('input[name="answer"]:checked').value
  );
  if (findQuest[0].answers[selectedAns].isCorrect) {
    score++;
    nextQuestion();
  } else {
    nextQuestion();
  }
}

function nextQuestion() {
  if (resolvedQuestion.length <= Questions.length) {
    resolvedQuestion.push(findQuest[0].id);
    findQuest.pop();
    return loadQues();
  } else {
    loadScore();
  }
}

// запуск таймера по кнопке
function startTimer() {
  // если таймер уже запущен — выходим из функции
  if (started) {
    return;
  }
  // запоминаем время нажатия
  var start_time = new Date();
  // получаем время окончания таймера
  var stop_time = start_time.setSeconds(start_time.getSeconds() + timer);

  // запускаем ежесекундный отсчёт
  var countdown = setInterval(function () {
    // текущее время
    var now = new Date().getTime();
    // сколько времени осталось до конца таймера
    var remain = stop_time - now;
    // переводим миллисекунды в минуты и секунды
    var min = Math.floor((remain % (1000 * 60 * 60)) / (1000 * 60));
    var sec = Math.floor((remain % (1000 * 60)) / 1000);
    // если значение текущей секунды меньше 10, добавляем вначале ведущий ноль
    sec = sec < 10 ? "0" + sec : sec;
    // отправляем значение таймера на страницу в нужный раздел
    document.getElementById("timer").innerHTML = min + ":" + sec;
    // если время вышло
    if (remain < 0) {
      // останавливаем отсчёт
      clearInterval(countdown);
      // пишем текст вместо цифр
      document.getElementById("timer").innerHTML = "Увы но тест не пройден :(";
      document.getElementById("opt").remove();
      document.getElementById("quiz").remove();
      document.getElementById("submit").remove();
    }
  });
  // помечаем, что таймер уже запущен
  started = true;
}
