const CELLS_COL=70;
const CELLS_ROW=42;
const CELLS=CELLS_COL*CELLS_ROW;

// Obtener tablero
var board;
var puntos;
var index_monster;
var contador=0;

function init() {
    // inicializar board
    board = document.querySelector('.board');
    puntos = document.querySelector('.puntos');

    // Crear las celdas del tablero
    for (let i = 0; i < CELLS; i++) {
        addCell(i);
    }
}

function addCell(i) {
    // crear celda
    const cell = document.createElement('div');
    cell.className = 'cell cell-'+i;

    // vincular celda
    board.appendChild(cell);
}
