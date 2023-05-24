const CELLS_COL=60;
const CELLS_ROW=49;
const CELLS=CELLS_COL*CELLS_ROW;


// Obtener tablero
var board;
var snake_pos_x;
var snake_pos_y;
var snake_tail=10;
var contador=0;
var puntos;

function init() {
    // inicializar board
    board = document.querySelector('.board');
    puntos = document.querySelector('.puntos');

    // Crear las celdas del tablero
    for (let i = 0; i < CELLS; i++) {
        addCell(i);
    }

    // obtener posición de la cabeza
    snake_pos_x=20;
    snake_pos_y=20;

    // dibujar la serpiente
    drawSnake(snake_pos_x,snake_pos_y);

    // evento de pulsación de tecla
    document.addEventListener('keydown', (event) => {
        switch(event.key) {
            case 'ArrowUp': moveSnake(-1,0); break; 
            case 'ArrowDown': moveSnake(1,0); break; 
            case 'ArrowLeft': moveSnake(0,-1); break; 
            case 'ArrowRight': moveSnake(0,1); break; 
        };
      }, false);    
}

function addCell(i) {
    // crear celda
    const cell = document.createElement('div');
    cell.className = 'cell cell-pos-'+i;

    // vincular celda
    board.appendChild(cell);
}

function drawSnake(x,y) {
     // establecer la cabeza
     setClassByXY('cell-snake-head',snake_pos_x,snake_pos_y);

     // establecer cuerpo
     for(i=0;i!=snake_tail;i++) {
        setClassByXY('cell-snake-body',snake_pos_x-i,snake_pos_y);
     }
}

function moveSnake(incX,incY) {
    var snake_head_old = document.getElementsByClassName("cell-snake-head")[0];
    var pos;
    for(i=0;i!=snake_head_old.classList.length;i++) {
        if (snake_head_old.classList[i].startsWith('cell-pos-')) {
            pos = parseInt(snake_head_old.classList[i].substring('cell-pos-'.length));
            console.log(pos);
        }
    }

    snake_head_old.classList.remove('cell-snake-head');
    snake_head_old.classList.remove('cell-snake-body');

    var item = document.getElementsByClassName("cell-pos-"+(pos+(incX*CELLS_COL+incY)))[0];
    item.classList.add('cell-snake-head');
}

function setClassByXY(className,x,y) {
    // obtener la posición
    var pos=y*CELLS_COL+x;

    // establecer la clase
    var item = document.getElementsByClassName("cell-pos-"+pos)[0];
    item.classList.add(className);
}
