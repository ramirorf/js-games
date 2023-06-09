const CELLS_COLS = 21;
const CELLS_ROWS = 19;
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

    // colocar monsters y hero    
    setMonster();
    setHero();


    // evento de pulsación de tecla
    document.addEventListener('keydown', (event) => {
        switch(event.key) {
            case 'ArrowLeft': moveHeroChecking(-1); break; 
            case 'ArrowRight': moveHeroChecking(1); break; 
            case ' ': heroShot(); break; 
        };
    }, false);    
    
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

function moveHeroChecking(incX) {
    // obtener posición de la celda del hero
    var cellHero = document.getElementsByClassName("cell-hero")[0];
    var cellHeroPosNew = getPos(cellHero) + incX;

    // mover si está en rango
    if( cellHeroPosNew > CELLS-CELLS_COLS-1 && cellHeroPosNew < CELLS) {
        var cellHeroNew = document.getElementsByClassName("cell-"+cellHeroPosNew)[0];
        cellHero.classList.remove("cell-hero");
        cellHeroNew.classList.add("cell-hero");
    }
}

function heroShot() {
    alert('Espacio');
    var cellHero = document.getElementsByClassName("cell-hero")[0];
    var cellHeroShotPos = getPos(cellHero) - CELLS_COLS;
    var cellHeroShot = document.getElementsByClassName("cell-"+cellHeroShotPos)[0];
 
    cellHeroShot.classList.add("cell-hero-shot");
 
}

function getPos(element) {
    var pos;
    for(i=0;i!=element.classList.length;i++) {
        if (element.classList[i].startsWith('cell-')) {
            pos = parseInt(element.classList[i].substring('cell-'.length));
            break;
        }
    }
    return pos;
}

function setMonster() {
    index_moster = Math.floor(Math.random() * CELLS);
    document.getElementsByClassName("cell-"+index_moster)[0].classList.add("cell-monster"); 
}

function setHero() {
    index_hero = Math.round(CELLS - CELLS_COLS/2);
    document.getElementsByClassName("cell-"+index_hero)[0].classList.add("cell-hero"); 
}
