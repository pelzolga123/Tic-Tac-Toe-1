let currentTurn = 'X';
let array = [];

const clicked = (id) => {
  document.addEventListener('DOMContentLoaded', () => {
    const cellId = document.getElementById(id);
    cellId.addEventListener('click', turns);
  });
};

const freeze = () => {
  const table = document.querySelector('table');
  table.setAttribute('class', 'avoid-clicks');
};

const unfreeze = () => {
  const table = document.querySelector('table');
  table.setAttribute('class', 'clicks');
};

const includesId = (x, y, z, arr) => {
  if (arr.includes(x) && arr.includes(y) && arr.includes(z)) {
    return true;
  }
  return false;
};

const combinations = (mark, arr) => {
  if (includesId('00', '11', '22', arr)
        || includesId('20', '11', '02', arr)
        || includesId('00', '01', '02', arr)
        || includesId('10', '11', '12', arr)
        || includesId('20', '21', '22', arr)
        || includesId('00', '10', '20', arr)
        || includesId('01', '11', '21', arr)
        || includesId('02', '12', '22', arr)
  ) {
    const name = addUsers();
    if (mark === 'X') {
      document.getElementById('title-card').innerHTML = `${name.first} wins`;
      document.getElementById('turn').innerHTML = '';
    } else if (mark === 'O') {
      document.getElementById('title-card').innerHTML = `${name.second} wins`;
      document.getElementById('turn').innerHTML = '';
    }
    freeze();
  } else if (arr.length >= 5) {
    document.getElementById('title-card').innerHTML = 'TIE';
  }
};

function turns() {
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
  const arrX = [];
  const arrO = [];
  const name = addUsers();
  result.forEach((mark) => {
    if (mark.key === 'X') {
      document.getElementById('turn').innerHTML = `${name.second}, it's your turn, mark - O `;
      arrX.push(mark.val);
      combinations(mark.key, arrX);
    } else if (mark.key === 'O') {
      document.getElementById('turn').innerHTML = `${name.first}, it's your turn, mark - X `;
      arrO.push(mark.val);
      combinations(mark.key, arrO);
    }
  });
};

const addUsers = () => {
  const first = document.getElementById('firstPlayer').value;
  const second = document.getElementById('secondPlayer').value;
  document.getElementById('turn').innerHTML = `${first}, please make your first move `;

  if (first === '' || second === '') {
    freeze();
  } else {
    unfreeze();
    return { first, second };
  }
};

function restartGame() {
  const table = document.getElementsByTagName('table')[0];
  const trs = table.getElementsByTagName('tr');
  const winner = document.getElementById('title-card');
  winner.innerHTML = '';
  let tds = null;
  unfreeze();
  for (let i = 0; i < trs.length; i += 1) {
    tds = trs[i].getElementsByTagName('td');
    for (let n = 0; n < trs.length; n += 1) {
      tds[n].innerText = '';
    }
  }
  array = [];
}

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
  freeze();
};

gameBoard();
