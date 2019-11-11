
let currentTurn = 'X';
let moves = 9;
let array = [];


const gameBoard = () => {
  const mainDiv = document.getElementById('game');
  const table = document.createElement('table');
  table.setAttribute('border', 1);

  for (let i = 0; i < 3; i += 1) {
    const row = document.createElement('tr');
    table.appendChild(row);

    for (let j = 0; j < 3; j += 1) {
      const cell = document.createElement('td');
      const index = i.toString() + j.toString();
      cell.setAttribute('id', index);
      row.appendChild(cell);
      clicked(index);
    }
  }

  mainDiv.appendChild(table);
  
};


function turns() {
  moves -= 1;

  if (this.innerText !== '') {
    return;
  }
  this.innerText = currentTurn;

  win(currentTurn, event.srcElement.id);

  if (currentTurn === 'X') {
    currentTurn = 'O';
  } else {
    currentTurn = 'X';
  }
}
const win = (turn, id) => {
  array.push({ [turn]: id });

  const result = array.map((obj) => ({
    key: Object.keys(obj)[0],
    val: Object.values(obj)[0],
  }));
  const arr_X = [];
  const arr_O = [];

  result.forEach((mark) => {
    if (mark.key === 'X') {
      arr_X.push(mark.val);
      combinations(mark.key, arr_X);
    } else if (mark.key === 'O') {
      arr_O.push(mark.val);
      combinations(mark.key, arr_O);
    }
  });
};

const combinations = (mark, arr) => {
  if (includes_id('00', '11', '22', arr)
        || includes_id('20', '11', '02', arr)
        || includes_id('00', '01', '02', arr)
        || includes_id('10', '11', '12', arr)
        || includes_id('20', '21', '22', arr)
        || includes_id('00', '10', '20', arr)
        || includes_id('01', '11', '21', arr)
        || includes_id('02', '12', '22', arr)
  ) {
     
    document.getElementById("title-card").innerHTML = `${mark} winns`;
    freese(); 
  }
  else if(arr.length >= 5){
    document.getElementById("title-card").innerHTML = 'Draw';
  }
};

const includes_id = (x, y, z, arr) => {
  if (arr.includes(x) && arr.includes(y) && arr.includes(z)) {
    return true;
  }
  return false;
};

function restartGame() {
  const table = document.getElementsByTagName('table')[0];
  const trs = table.getElementsByTagName('tr');
  let tds = null;

  for (let i = 0; i < trs.length; i += 1) {
    tds = trs[i].getElementsByTagName('td');
    for (let n = 0; n < trs.length; n += 1) {
      tds[n].innerText = '';
    }
  }
  array = [];
}


const clicked = (id) => {
  document.addEventListener('DOMContentLoaded', () => {
    const cellId = document.getElementById(id);
    cellId.addEventListener('click', turns);
  });
};

const freese = () => {
    var table  = document.querySelector("table");
    table.setAttribute('class', 'avoid-clicks');
};

gameBoard();
