const state = {
  added: false,
  sign: 0, 
  unit: 1, 
  arr: [],
  size: 10,
  delay: 500,
  element: {
    div: document.getElementById("output"),
    btn: document.getElementById("add-element")
  }
};

state.element.btn.addEventListener("click", add);

function add() {
  adding(state);
}

function adding(obj) {
  if (obj.arr.length < obj.size) {
    obj.added = true;
  } else {
    console.log("String is full");
  }
}
(function start(obj) {
  const arr = new Array(obj.size);
  const str = arr.fill(obj.sign).join("");
  obj.element.div.textContent = str;
})(state);

class Unit{
    constructor(side = 1, position = 0, sign = state.unit, arr = state.arr){
    this.position = position;
    this.side = side;
    this.sign = sign;
    this.arr = arr;
  }
 step() {
    this.position += this.side; 
}
 reverse() {
    this.side *= -1;
}
 isEdge() {
   if(
     (this.position === state.size - 1 && this.side > 0) ||
     (this.position === 0 && this.side < 0)
     ) {
     return true;
   } return false;
}
isCollision() {
  if(
    this.arr[this.position + this.side] === this.sign ||
    this.arr[this.position - this.side] === this.sign
    ) {
    return true;
  } return false;
  }

}

  setInterval(function() {
    let arrFromStr = state.element.div.textContent.split("");
    if(state.added){
      if(+arrFromStr[0] === state.sign) {
        let unit = new Unit();
        arrFromStr[0] = state.sign;
        state.element.div.textContent = arrFromStr.join("");
        state.added = false;
        state.arr.push(unit);
      }
    }
    if(state.arr.length > 0){
      state.arr.map(elem =>{
        const StrToArr = state.element.div.textContent.split("");
        if(elem.isEdge() || elem.isCollision(arrFromStr)) {
          elem.reverse();
          elem.step();
        } else {
          elem.step();
        }
      });
      render(state);
    }
  }, state.delay);
state.element.btn.addEventListener("click", add);

  function render(state) {
    const strToArr = state.element.div.textContent.split("");
    const sign = state.arr.map(elem => elem.position);
    state.element.div.textContent = strToArr
       .map((elem, i) => (elem = sign.includes(i) ? state.unit : state.sign))
        .join("");
        
  }
























// class Game {
//   constructor() {

//   }
//    add() {
//         adding(state);
//    }
//    adding(obj) {
//          if (obj.arr.length < obj.size) {
//          obj.added = true;
//          } else {
//         console.log("String is full");
//          }
//   }
//   (start(obj) { //чи винести за клас
//         const arr = new Array(obj.size);
//         const str = arr.fill(obj.sign).join("");
//         obj.elements.div.textContent = str;
//         })(state)
//   Unit(side = 1, position = 0, sign = state.unit) {
//         this.sign = sign; // символ для добавления
//         this.side = side; // направление движения
//         this.position = position;
// }
//    step () {
//        this.position += this.side;
//    }
//    reverce () {
//         this.side *= -1; 
//    }
//    isEdge () {
//         if (
//           (this.position === state.size - 1 && this.side > 0) ||
//           (this.position === 0 && this.side < 0)
//         ) {
//           return true;
//         }
//           return false;
//     }
//    isCollision (arr) {
//         if (
//           arr[this.position + this.side] === this.sign ||
//           arr[this.position - this.side] === this.sign
//         ) {
//           return true;
//         }
//           return false;
//   }
// }


