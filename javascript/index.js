
let currentTurn = 'X';
let moves = 9;
const array = [];


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
  console.log(currentTurn);
  // console.log(moves);
  console.log(array);
}

const clicked = (id) => {
  document.addEventListener('DOMContentLoaded', () => {
    const cellId = document.getElementById(id);
    cellId.addEventListener('click', turns);
  });
};

gameBoard();


function getWinner() {
  const winCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];

  winCombo.forEach((el) => {
    el.forEach((e) => {
      // console.log(e);
      let counts = 0;
      if ((array.indexOf('X') === e && counts === 3) || (array.indexOf('X') === e && counts === 3)) {
        counts += 1;
      }
    });
  });
}

getWinner();


function restartGame() {

}
