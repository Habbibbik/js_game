// Этап 1. Создаём функцию для генерации массива парных чисел
let count = 4 * 4; // Задаём количество карточек (16 карточек, 8 пар)

// Функция для создания массива парных чисел
function createNumbersArray(count) {
  let lempArray = [];
  for (let i = 1; i <= count / 2; i++) {
    lempArray.push(i);
    lempArray.push(i);
  }
  return lempArray;
}

console.log(createNumbersArray(count)); // Проверяем создание массива парных чисел

// Этап 2. Функция перемешивания массива
function shuffle(arr) {
  let shuffledArray = arr.slice(); // Создаём копию массива для перемешивания
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // Выбираем случайный индекс
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Обмен значениями
  }
  return shuffledArray;
}

let numbersArray = createNumbersArray(count); // Создаём массив чисел
let shuffledNumbersArray = shuffle(numbersArray); // Перемешиваем массив
console.log(shuffledNumbersArray); // Проверяем перемешанный массив

// Этап 3. Используем функции для создания массива с перемешанными номерами
// Этап 4. Создаём DOM-элементы карточек на основе массива

function startGame(count) {
  let div = document.createElement('div'); // Создаём div для игры
  let ul = document.createElement('ul'); // Создаём ul для карточек

  div.classList.add('game'); // Добавляем класс 'game' для div
  ul.classList.add('game__element'); // Добавляем класс 'game__element' для ul

  div.prepend(ul); // Вставляем ul в div
  document.body.append(div); // Вставляем div в body

  // Создаём и добавляем карточки в ul
  for (let i = 0; i < count; i++) {
    let li = document.createElement('li'); // Создаём li для карточки
    li.classList.add('game__card'); // Добавляем класс 'game__card' для li
    li.dataset.value = numbersArray[i]; // Присваиваем значение из массива numbersArray
    ul.prepend(li); // Вставляем карточку в ul
  }

  // Создаём и добавляем кнопку для начала игры
  let button = document.createElement('button'); // Создаём кнопку
  button.classList.add('button'); // Добавляем класс 'button' для кнопки

  button.textContent = 'НАЧАТЬ ИГРУ'; // Устанавливаем текст кнопки
  document.body.append(button); // Вставляем кнопку в body
  ul.after(button); // Вставляем кнопку после ul

  let openedCards = []; // Массив для открытых карточек

  // Обработчик события клика для карточек
  ul.addEventListener('click', function(event) {
    if (event.target.tagName !== 'LI') return; // Проверяем, что кликнули по li
    let li = event.target; // Получаем кликнутую карточку

    if (openedCards.length === 2 || li.classList.contains('matched')) return; // Проверяем, что открыто не более двух карточек и карточка не совпадает

    li.textContent = li.dataset.value; // Показываем значение карточки
    li.classList.add('opened'); // Добавляем класс 'opened' для li
    openedCards.push(li); // Добавляем карточку в массив открытых

    if (openedCards.length === 2) { // Если открыты две карточки
      if (openedCards[0].dataset.value === openedCards[1].dataset.value) { // Проверяем, совпадают ли значения карточек
        openedCards[0].classList.add('matched'); // Добавляем класс 'matched' для первой карточки
        openedCards[1].classList.add('matched'); // Добавляем класс 'matched' для второй карточки
        openedCards = []; // Очищаем массив открытых карточек
      } else {
        setTimeout(() => { // Если карточки не совпадают
          openedCards[0].textContent = ''; // Скрываем значение первой карточки
          openedCards[1].textContent = ''; // Скрываем значение второй карточки
          openedCards[0].classList.remove('opened'); // Удаляем класс 'opened' для первой карточки
          openedCards[1].classList.remove('opened'); // Удаляем класс 'opened' для второй карточки
          openedCards = []; // Очищаем массив открытых карточек
        }, 1000); // Задержка в 1 секунду перед скрытием
      }
    }
  });

  // Обработчик события клика для кнопки
  button.addEventListener('click', function() {
    const liElements = document.querySelectorAll('.game__card'); // Получаем все карточки
    let shuffledNumbersArray = shuffle(numbersArray); // Перемешиваем массив

    // Присваиваем новые значения карточкам
    for (let i = 0; i < count; i++) {
      liElements[i].textContent = ''; // Скрываем значение карточки
      liElements[i].classList.remove('opened', 'matched'); // Удаляем классы 'opened' и 'matched'
      liElements[i].dataset.value = shuffledNumbersArray[i]; // Присваиваем новое значение из перемешанного массива
    }
  });
}

startGame(count);



