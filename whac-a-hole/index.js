const CELLS_COLS = 6;
const CELLS_ROWS = 6;
const CELLS=CELLS_COLS*CELLS_ROWS;

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

    // colocar monster    
    setMonster();
}

function cellClick(cell) {
    if (document.getElementsByClassName("cell-"+index_moster)[0] == cell) {
        // incrementar puntos
        puntos.innerHTML = parseInt(puntos.innerHTML)+1;

        // quitar el monster
        cell.classList.remove('cell-monster');

        // colocar monster    
        setMonster();
    }
}

function addCell(i) {
    // crear celda
    const cell = document.createElement('div');
    cell.className = 'cell cell-'+i;
    cell.addEventListener('click', () => cellClick(cell));

    // vincular celda
    board.appendChild(cell);
}

function setMonster() {
    index_moster = Math.floor(Math.random() * CELLS);
    document.getElementsByClassName("cell-"+index_moster)[0].classList.add("cell-monster"); 
}
