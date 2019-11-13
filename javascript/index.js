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

const player = (() => {
  const check = (first, second) => {
    if (first === '' || second === '') {
      freeze();
    } else {
      unfreeze();
      document.getElementById('turn').innerHTML = `${first}, please make your first move `;
    }
    return { first, second };
  };
  return { check };
})();

const addUsers = () => {
  const first = document.getElementById('firstPlayer').value;
  const second = document.getElementById('secondPlayer').value;
  return player.check(first, second);
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
    document.getElementById('turn').innerHTML = '';
  }
};

const game = (() => {
  const currentTurn = 'X';
  const array = [];

  return { currentTurn, array };
})();

const win = (turn, id) => {
  game.array.push({ [turn]: id });

  const result = game.array.map(obj => ({
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

function turns(event) {
  if (this.innerText !== '') {
    return;
  }
  this.innerText = game.currentTurn;

  win(game.currentTurn, event.srcElement.id);

  if (game.currentTurn === 'X') {
    game.currentTurn = 'O';
  } else {
    game.currentTurn = 'X';
  }
}

const clicked = (id) => {
  document.addEventListener('DOMContentLoaded', () => {
    const cellId = document.getElementById(id);
    cellId.addEventListener('click', turns);
  });
};

function restartGame() {
  const table = document.getElementsByTagName('table')[0];
  const trs = table.getElementsByTagName('tr');
  document.getElementById('title-card').innerHTML = '';
  document.getElementById('turn').innerHTML = '';
  let tds = null;
  unfreeze();
  for (let i = 0; i < trs.length; i += 1) {
    tds = trs[i].getElementsByTagName('td');
    for (let n = 0; n < trs.length; n += 1) {
      tds[n].innerText = '';
    }
  }
  game.array = [];
}

const gameBoard = (() => {
  const mainDiv = document.getElementById('game');
  const table = document.createElement('table');
  table.setAttribute('border', 1);
  const btn = document.getElementById('replay');
  btn.addEventListener('click', restartGame);
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

  return mainDiv.appendChild(table);
})();
