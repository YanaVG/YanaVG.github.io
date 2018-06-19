  1
const state = {
  added: false, // снятие блокировки добавления объектов в массив: adding()
  sign: 0, // символ для начального заполнения,
  unit: 1, // символ для добавления
  arr: [], // объекты добавленных симвлов
  size: 10, // размер массива на странице
  delay: 500, // период обновления
  elements: {
    div: document.getElementById("output"),
    btn: document.getElementById("add-element")
  }
};

state.elements.btn.addEventListener("click", add);

function add() {
  adding(state);
}
// снятие блокировки добавления объектов Unit в массив
function adding(obj) {
  if (obj.arr.length < obj.size) {
    obj.added = true;
  } else {
    console.log("String is full");
  }
}
// начальный экран заповняєм строку нулями з масиву довжиною 10
(function start(obj) {
  const arr = new Array(obj.size);
  const str = arr.fill(obj.sign).join("");
  obj.elements.div.textContent = str;
})(state);

// Объект (абстракция)
function Unit(side = 1, position = 0, sign = state.unit) {
  this.sign = sign; // символ для добавления
  this.side = side; // направление движения
  this.position = position;
}

// Наследование
// сменить положение в отображаемом массиве
Unit.prototype.step = function() {
  this.position += this.side;
};

// cменить направление движения
Unit.prototype.reverce = function() {
  this.side *= -1;
};

// сделать reverce если true
Unit.prototype.isEdge = function() {
  if (
    (this.position === state.size - 1 && this.side > 0) ||
    (this.position === 0 && this.side < 0)
  ) {
    return true;
  }
  return false;
};

// сделать reverce если true, коли зіткнення відбулось
Unit.prototype.isCollision = function(arr) {
  if (
    arr[this.position + this.side] === this.sign ||
    arr[this.position - this.side] === this.sign
  ) {
    return true;
  }
  return false;
};

// Работает всегда, отображает в случае наличия объекта
setInterval(function() {
  // init Unit
  let arrFromStr = state.elements.div.textContent.split("");
  if (state.added) {
    if (+arrFromStr[0] === state.sign) {
      let unit = new Unit();
      arrFromStr[0] = unit.sign;
      state.elements.div.textContent = arrFromStr.join("");
      state.added = false;
      state.arr.push(unit);
    }
  }
  // regular steps for Units
  if (state.arr.length > 0) {
    state.arr.map(elem => {
      const strToArr = state.elements.div.textContent.split("");
      if (elem.isEdge() || elem.isCollision(arrFromStr)) {
        elem.reverce();
        elem.step();
      } else {
        elem.step();
      }
    });
    render(state);
  }
}, state.delay);

function render(obj) {
  const strToArr = obj.elements.div.textContent.split("");
  const sign = obj.arr.map(elem => elem.position);
  obj.elements.div.textContent = strToArr
    .map((elem, i) => (elem = sign.includes(i) ? obj.unit : obj.sign))
    .join("");
}

// проверка функции render
/*
const test = [
  { position: 0 },
  { position: 8 },
  { position: 5 },
  { position: 1 },
  { position: 3 },
  { position: 4 }
];
render(test, state.elements.div);
*/