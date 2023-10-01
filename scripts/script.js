// на сколько секундах ставим таймер
const timer = 60;

// запущен таймер или нет
started = false;

// Число очков
let score = 0;

// Пустые массивы для дальнейшей работы с квестами
const correctAnswer = [];
const notCorrectAnswer = [];

const resolvedQuestion = [];
const findQuest = [];

// Загрузка вопроса
function loadQues() {
  // Обнуление Массива
  findQuest.pop();
  // Генирация рандомного числа
  const randomNumber = Math.floor(Math.random() * Questions.length);
  // Поиск рандомного числа в Объетке по ID
  const findQuestions = Questions.find((elem) => elem.id === randomNumber);
  // Проверка Массива на наличия схожих элементов
  const copyOrNot = resolvedQuestion.includes(findQuestions.id);

  // Oбнуление inputs
  document.getElementById("opt").innerHTML = "";

  // Проверка кол-во вопросов
  if (resolvedQuestion.length == Questions.length) {
    loadScore();
  }
  // Проверка на повторения вопросов
  if (copyOrNot == true) {
    loadQues();
  }
  if (copyOrNot == false) {
    findQuest.push(findQuestions);
    document.getElementById("quiz").textContent = findQuestions.question;

    // Создания раздела с ответами на вопросы
    for (let i = 0; i < Questions[findQuestions.id].answers.length; i++) {
      const choice = document.createElement("input");
      const choiceLabel = document.createElement("label");
      const choiceSpan = document.createElement("span");

      choice.type = "radio";
      choice.name = "answer";
      choice.value = i;

      choiceSpan.textContent = findQuestions.answers[i].text;

      document.getElementById("opt").appendChild(choiceLabel);
      choiceLabel.appendChild(choice);
      choiceLabel.appendChild(choiceSpan);
    }
  }
}

// Добавление класса start for body для начало теста
function addClass() {
  try {
    const body = document.getElementById("training-body");
    body.classList.add("start");
    loadQues();
  } catch {
    const body = document.getElementById("body");
    body.classList.add("start");
    loadQues();
    // Включение таймера
    startTimer();
  }
}

// Функция загрузки очков
function loadScore() {
  // Удаление элементов
  document.getElementById("opt").remove();
  document.getElementById("quiz").remove();
  try {
    document.getElementById("submit").remove();
  } catch {
    document.getElementById("training-submit").remove();
  }

  document.getElementById("submit-loadscore").remove();
  document.getElementById("timer").remove();
  // Получения элемента
  const totalScore = document.getElementById("score");
  // Подсчёт процента ответов
  const scorePerCent = Math.round((100 * score) / Questions.length);
  // Вывод результата теста с учётом процентов

  try {
    const trainingScore = document.getElementById("training-score");
    trainingScore.innerHTML = `Вы ответили правильно на - ${score} из ${resolvedQuestion.length} <br>Не верных ответов было - ${notCorrectAnswer.length}`;
  } catch {
    function scroeLoading() {
      if (scorePerCent >= 70) {
        totalScore.innerHTML = `Вы успешно прошли тест! <br> Тест пройден на ${scorePerCent}%`;
      } else {
        totalScore.innerHTML = `Увы но вы не прошли тест :(  <br> Тест пройден на ${scorePerCent}%`;
      }
    }
    scroeLoading();
  }
}

// Функция проверки ответов
function checkAnsTraining() {
  // Выбранный input
  const selectedAns = parseInt(
    document.querySelector('input[name="answer"]:checked').value
  );
  const body = document.getElementById("training-body");

  // Если ответ правельный +очко если нет то просто запуск следующий вопрос
  if (findQuest[0].answers[selectedAns].isCorrect) {
    score++;
    body.classList.add("true");
    setTimeout(() => {
      body.classList.remove("true");
    }, 500);
    nextQuestion();
  } else {
    body.classList.add("false");
    setTimeout(() => {
      body.classList.remove("false");
    }, 500);
    notCorrectAnswer.push(findQuest[0].id);
    nextQuestion();
  }
}

// Функция проверки ответов
function checkAns() {
  // Выбранный input
  const selectedAns = parseInt(
    document.querySelector('input[name="answer"]:checked').value
  );

  // Если ответ правельный +очко если нет то просто запуск следующий вопрос
  if (findQuest[0].answers[selectedAns].isCorrect) {
    score++;
    nextQuestion();
  } else {
    nextQuestion();
  }
}

// Функция начало следующего вопроса
function nextQuestion() {
  // Отправка Id вопроса на который уже был дан ответ
  if (resolvedQuestion.length <= Questions.length) {
    resolvedQuestion.push(findQuest[0].id);
    loadQues();
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
  let start_time = new Date();
  // получаем время окончания таймера
  let stop_time = start_time.setSeconds(start_time.getSeconds() + timer);

  // запускаем ежесекундный отсчёт
  const countdown = setInterval(function () {
    // текущее время
    const now = new Date().getTime();
    // сколько времени осталось до конца таймера
    const remain = stop_time - now;
    // переводим миллисекунды в минуты и секунды
    const min = Math.floor((remain % (1000 * 60 * 60)) / (1000 * 60));
    let sec = Math.floor((remain % (1000 * 60)) / 1000);
    // если значение текущей секунды меньше 10, добавляем вначале ведущий ноль
    sec = sec < 10 ? "0" + sec : sec;
    // отправляем значение таймера на страницу в нужный раздел
    if (document.getElementById("timer") == undefined) {
      started = false;
    } else {
      document.getElementById("timer").innerHTML = min + ":" + sec;
    }
    // если время вышло
    if (remain < 0) {
      // останавливаем отсчёт
      clearInterval(countdown);
      // пишем текст вместо цифр
      time = document.getElementById("timer");

      time.innerHTML = "Увы но тест не пройден :(";
      time.classList.add("active");
      document.getElementById("opt").remove();
      document.getElementById("quiz").remove();
      try {
        document.getElementById("submit").remove();
      } catch {
        document.getElementById("training-submit").remove();
      }
      document.getElementById("submit-loadscore").remove();
    }
  });
  // помечаем, что таймер уже запущен
  started = true;
}
