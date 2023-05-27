const CELLS_COL=60;
const CELLS_ROW=49;
const CELLS=CELLS_COL*CELLS_ROW;

const SNAKE_SIZE=10; 

// Obtener tablero
var board;
var snake_pos_x;
var snake_pos_y;
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

    // inicializar la serpiente
    initSnake();

    // evento de pulsación de tecla
    document.addEventListener('keydown', (event) => {
        switch(event.key) {
            case 'ArrowUp': moveSnakeChecking(-1,0); break; 
            case 'ArrowDown': moveSnakeChecking(1,0); break; 
            case 'ArrowLeft': moveSnakeChecking(0,-1); break; 
            case 'ArrowRight': moveSnakeChecking(0,1); break; 
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

function initSnake() {
    // borrar la serpiente si existe:
    removeSnake();

    // obtener posición de la cabeza
    snake_pos_x=20;
    snake_pos_y=20;

    // dibujar la serpiente
    drawSnake(snake_pos_x,snake_pos_y);
}

function removeSnake() {
    removeClass("cell-snake-head");
    removeClass("cell-snake-tail");
    removeClass("cell-snake-body");

    for(i=0;i!=SNAKE_SIZE;i++) {
        removeClass("cell-snake-"+i);
    }
}

function drawSnake(x,y) {
     // establecer la cabeza
     setClassByXY('cell-snake-head',snake_pos_x,snake_pos_y);

     // establecer cuerpo
     setClassByXY('cell-snake-0',snake_pos_x-0,snake_pos_y);
     for(i=1;i!=SNAKE_SIZE-1;i++) {
        setClassByXY('cell-snake-body',snake_pos_x-i,snake_pos_y);
        setClassByXY('cell-snake-'+i,snake_pos_x-i,snake_pos_y);
     }

     // establecer la cola
     setClassByXY('cell-snake-tail',snake_pos_x-(SNAKE_SIZE-1),snake_pos_y);
     setClassByXY('cell-snake-'+(SNAKE_SIZE-1),snake_pos_x-(SNAKE_SIZE-1),snake_pos_y);
}

function moveSnakeChecking(incX,incY) {
    // obtener posición de la celda de la cabeza
    var snake_head_old = document.getElementsByClassName("cell-snake-head")[0];
    var pos = getPos(snake_head_old);

    // si la nueva cabeza no es válida
    var snake_head_new = document.getElementsByClassName("cell-pos-"+(pos+(incX*CELLS_COL+incY)))[0];
    if (snake_head_new.classList.contains("cell-snake-body") || snake_head_new.classList.contains("cell-snake-tail")) {
        
        // reiniciar
        alert('¡¡Perdiste!!');
        initSnake();
    } else {

        // mover
        moveSnake(incX,incY);
    }
}

function moveSnake(incX,incY) {

   // borrar el último elemento de la cola
   var snake_tail_old = document.getElementsByClassName("cell-snake-tail")[0];
   snake_tail_old.classList.remove('cell-snake-tail');
   snake_tail_old.classList.remove('cell-snake-'+(SNAKE_SIZE-1));

    // renumerar elementos
    for(i=SNAKE_SIZE-2;i!=-1;i--) {
        var snake_item = document.getElementsByClassName("cell-snake-"+i)[0];
        snake_item.classList.remove('cell-snake-'+i);
        snake_item.classList.add('cell-snake-'+(i+1));
    }

    // obtener la posición de la cabeza
    var snake_head_old = document.getElementsByClassName("cell-snake-head")[0];
    var pos = getPos(snake_head_old);

    // convertir la antigua cabeza en cuerpo
    snake_head_old.classList.remove('cell-snake-head');
    snake_head_old.classList.add('cell-snake-body');
    snake_head_old.classList.remove('cell-snake-0');
    snake_head_old.classList.add('cell-snake-1');
  
    // convertir el hueco siguiente en la nueva cabeza 
    var snake_head = document.getElementsByClassName("cell-pos-"+(pos+(incX*CELLS_COL+incY)))[0];
    snake_head.classList.add('cell-snake-head');
    snake_head.classList.add('cell-snake-0');

    // marcar la nueva cola
    var snake_tail = document.getElementsByClassName("cell-snake-"+(SNAKE_SIZE-1))[0];
    snake_tail.classList.remove('cell-snake-body');
    snake_tail.classList.add('cell-snake-tail');
}

function getPos(element) {
    var pos;
    for(i=0;i!=element.classList.length;i++) {
        if (element.classList[i].startsWith('cell-pos-')) {
            pos = parseInt(element.classList[i].substring('cell-pos-'.length));
            break;
        }
    }
    return pos;
}

function setClassByXY(className,x,y) {
    // obtener la posición
    var pos=y*CELLS_COL+x;

    // establecer la clase
    var item = document.getElementsByClassName("cell-pos-"+pos)[0];
    item.classList.add(className);
}

function removeClass(className) {
    var items = document.getElementsByClassName(className);
    if(items) {
        for(j=items.length-1;j>=0;j--) {
            if(items[j]) { 
                items[j].classList.remove(className);
            }
        }
    }
}