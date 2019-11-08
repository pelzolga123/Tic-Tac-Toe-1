const gameBoard = () => {
    const mainDiv = document.getElementById('game');
    const table = document.createElement('table');
    table.setAttribute("border", 1);

    for (let i=0; i<3; i++){
        const row = document.createElement('tr');
        table.appendChild(row);
        
        for(let j=0; j<3; j++){
            const cell = document.createElement('td');
            const index = i.toString()+j.toString();
            cell.setAttribute('id',index);
            row.appendChild(cell);
        }
    }
    mainDiv.appendChild(table);
};



gameBoard();