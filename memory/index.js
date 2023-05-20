function init() {
    const boardElement = document.querySelector('.board');

    // Crear las celdas del tablero
    for (let i = 0; i < 30; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell row-' + Math.floor(i/6) + ' col-' + i%6; 
        boardElement.appendChild(cell);
    }
}
