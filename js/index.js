// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления
//
const minweightInput = document.querySelector('.minweight__input'); // Значение поля с минимальным значением веса
const maxweightInput = document.querySelector('.maxweight__input'); // Значение поля с максимальным значением веса

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

function getColorFruits(arg){
  if(arg == "фиолетовый"){
      return "fruit_violet";
    } else if(arg == "зеленый"){
      return "fruit_green";
    } else if(arg == "розово-красный"){
      return "fruit_carmazin";
    } else if(arg == "желтый"){
      return "fruit_yellow";
    } else if(arg == "светло-коричневый"){
      return "fruit_lightbrown";
    } else {
      return "fruit_green"; 
    }
}

// отрисовка карточек
const display = (arr) => {
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits
  fruitsList.innerHTML = '';

  for (let i = 0; i < arr.length; i++) {
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild
    let templateLi = document.createElement("li");
    let classLi = `fruit__item ${getColorFruits(arr[i].color)}`;
    templateLi.className = classLi;
    fruitsList.appendChild(templateLi);


    let fruitsListDiv = document.querySelectorAll(`.${getColorFruits(arr[i].color)}`);

    let templateDiv = document.createElement("div");
    templateDiv.className = 'fruit__info';

    let nubmberDivColor = fruitsListDiv.length - 1;
    
    fruitsListDiv[nubmberDivColor].appendChild(templateDiv);
    
    const fruitsObj = document.querySelectorAll(".fruit__info");

    let templateDivIndex = document.createElement("div");
    templateDivIndex.innerHTML = `index: ${i}`;

    let templateDivKind = document.createElement("div");
    templateDivKind.innerHTML = `kind: ${arr[i].kind}`;

    let templateDivColor = document.createElement("div");
    templateDivColor.innerHTML = `color: ${arr[i].color}`;

    let templateDivWeight = document.createElement("div");
    templateDivWeight.innerHTML = `weight (кг): ${arr[i].weight}`;

    fruitsObj[i].appendChild(templateDivIndex);
    fruitsObj[i].appendChild(templateDivKind);
    fruitsObj[i].appendChild(templateDivColor);
    fruitsObj[i].appendChild(templateDivWeight);

  }
};

// первая отрисовка карточек
display(fruits);

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];
  let i = 0;
  let j = 0;
  // ATTENTION: сейчас при клике вы запустите бесконечный цикл и браузер зависнет
  while (fruits.length > 0) {
    // TODO: допишите функцию перемешивания массива
    //
    // Подсказка: находим случайный элемент из fruits, используя getRandomInt
    let randomItem = getRandomInt(0, fruits.length - 1);
    // вырезаем его из fruits и вставляем в result.
    result[i] = fruits[randomItem];
    if(fruits[randomItem] == fruits[0]){
      j++;
    }
    fruits.splice(randomItem, 1);
    i++;
    // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
    // (массив fruits будет уменьшатся, а result заполняться)
  }
  fruits = result;
  if(fruits.length == j){
    alert("Упс ... Что-то пошло не так ... Фрукты не перемешались!");
  }
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display(fruits);
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = function() {
   return fruits.filter(function(item) {
    return parseInt(item.weight) <= parseInt(maxweightInput.value) && parseInt(item.weight) >= parseInt(minweightInput.value);
  });
};


filterButton.addEventListener('click', () => {
  fruits = filterFruits();
  display(fruits);
});

/*** СОРТИРОВКА ***/

let sortKindbubble = 'bubbleSort'; // инициализация состояния вида сортировки
let sortKindquick = 'quickSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const priorityJson = `[
  {"color": "фиолетовый", "priorityIndex": 2},
  {"color": "зеленый", "priorityIndex": 1},
  {"color": "розово-красный", "priorityIndex": 3},
  {"color": "желтый", "priorityIndex": 5},
  {"color": "светло-коричневый", "priorityIndex": 4}
]`; //Массив цветов для сортировки

let priority = JSON.parse(priorityJson);

const comparationColor = (a, b) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
  let templelemA,templelemB;
  for (let i = 0; i < priority.length; i++){
      if(a.color == priority[i].color){
        templelemA = priority[i].priorityIndex;
      }
      if(b.color == priority[i].color){
        templelemB = priority[i].priorityIndex;
      }
  }
return templelemA < templelemB;
};

// функция разделитель
function partition(arr, left, right) {
  const pivot = arr[Math.floor((right + left) / 2)].priorityIndex;

  while (left <= right) {
      while (arr[left].priorityIndex > pivot) {
        left++;
      }
      while (arr[right].priorityIndex < pivot) {
        right--;
      }
      if (left <= right) {
          swap(arr, left, right);
          left++;
          right--;
      }
  }
  return left;
}
      // функция обмена элементов
function swap(arr, i, j){
 const temp = arr[i];
 arr[i] = arr[j];
 arr[j] = temp;
}

function quickSortHelper(arr, left, right) {
  if (arr.length < 2){
    return arr;
    }
  let index = partition(arr, left, right);

  if (left < index - 1) {
    quickSortHelper(arr, left, index - 1);
    }
  if (index < right) {
    quickSortHelper(arr, index, right);
    }
  return arr;
}

const sortAPI = {
  bubbleSort(arr, comparation) {
    // TODO: допишите функцию сортировки пузырьком
  const n = arr.length;
   // внешняя итерация по элементам
   for (let i = 0; i < n - 1; i++) { 
       // внутренняя итерация для перестановки элемента в конец массива
       for (let j = 0; j < n - 1 - i; j++) { 
           // сравниваем элементы
           if (comparation(arr[j], arr[j+1])) { 
               // делаем обмен элементов
               let temp = arr[j + 1]; 
               arr[j + 1] = arr[j]; 
               arr[j] = temp; 
           }
       }
   }               
  },
  quickSort(arr){
    for(let i = 0; i < arr.length; i++){
      for(let j = 0; j < priority.length; j++){
        if(arr[i].color == priority[j].color){
          arr[i].priorityIndex = priority[j].priorityIndex;
        }
      }
    }
    return quickSortHelper(arr, 0, arr.length - 1);
   },
    // выполняет сортировку и производит замер времени
    startSort(sort, arr, comparation) {
      const start = new Date().getTime();
      sort(arr, comparation);
      const end = new Date().getTime();
      sortTime = `${end - start} ms`;
      sortTimeLabel.textContent = sortTime;
    },
  

};

// инициализация полей
sortKindLabel.textContent = sortKindbubble;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
  if(sortKindLabel.textContent == sortKindbubble){
    sortKindLabel.textContent = sortKindquick;
  } else{
    sortKindLabel.textContent = sortKindbubble;
  }
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  let sortKind = sortKindLabel.textContent;
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);

  
  display(fruits);
  // TODO: вывести в sortTimeLabel значение sortTime
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  let n = fruits.length;
  let obj = new Object;
  kindInput.value;
  colorInput.value;
  weightInput.value;
  if(kindInput.value == '' || colorInput.value == '' || weightInput.value == ''){
    alert("Не все поля заполнены! Введите недостающие значения!")
  } else{
  obj.kind = kindInput.value;
  obj.color = colorInput.value.toLowerCase();
  obj.weight = parseInt(weightInput.value);
  fruits[n] = obj;
  display(fruits);
}
});
