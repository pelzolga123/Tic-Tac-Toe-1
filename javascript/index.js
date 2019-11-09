
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

  if (currentTurn === 'X') {
    currentTurn = 'O';
  } else {
    currentTurn = 'X';
  }


  array.push(this.innerText);
  // console.log(currentTurn);
  // console.log(moves);
  console.log(array);
}

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

gameBoard();


function getCell() {
  return document.getElementsByTagName('td').innerText;
}
