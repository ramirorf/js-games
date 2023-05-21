
const IMAGES_COLS=6; 
const IMAGES_ROWS=6; 
const IMAGES_MAX=IMAGES_COLS*IMAGES_ROWS;
const CELLS_COLS = 6;
const CELLS_ROWS = 6;
const CELLS=CELLS_COLS*CELLS_ROWS;

var celda_seleccionada=null;
var celdas_imagen=[];

function init() {
    const boardElement = document.querySelector('.board');

    // Obtener disposición de imagenes
    celdas_imagen=obtenerCeldasImagen(CELLS, CELLS / 2 );
    
    // Crear las celdas del tablero
    for (let i = 0; i < CELLS; i++) {

        const cell = document.createElement('div');

        cell.className = 'cell row-' + Math.floor(celdas_imagen[i]/6) + ' col-' + celdas_imagen[i]%6 + ' cell-hide';
        //cell.className = 'cell row-' + 0 + ' col-' + 0 + ' cell-hide';

        cell.addEventListener('click', () => cellClick(cell));
        boardElement.appendChild(cell);
    }
}

function obtenerCeldasImagen(celdas_max, images_max) {
    var celdas_imagen=[];
    
    for(i=0 ; i!=celdas_max; i++) {
        celdas_imagen[i]=-1;
    }

    var celdas_imagen_colocadas=[];
    for(i=0 ; i!=images_max; i++) {
        {
            const offset = Math.floor(Math.random() * celdas_max);
            for(j=0; j!=celdas_max; j++) {
                const index = (offset+j) % celdas_max;
                if(celdas_imagen[index] == -1) {
                    celdas_imagen[index] = i;
                    break; 
                }
            }
        }
        {
            const offset = Math.floor(Math.random() * celdas_max);
            for(j=0; j!=celdas_max; j++) {
                const index = (offset+j) % celdas_max;
                if(celdas_imagen[index] == -1) {
                    celdas_imagen[index] = i;
                    break; 
                }
            }
        }
    }

    return celdas_imagen;
}

function cellClick(cell) {
    // si la celda no está descubieta
    if(cell.classList.contains("cell-hide")) {
        // mostrar celda
        cell.classList.remove("cell-hide");
        if(celda_seleccionada == null) {
            celda_seleccionada = cell;
        } else {

            // comprobar si es la misma imagen
            if(mismaImagen(celda_seleccionada, cell)) {
                // la celda seleccionada anterior se queda seleccionada (igual que la actual)       
                celda_seleccionada = null;
                
                // si todas están descubiertas
                if(document.getElementsByClassName('cell-hide').length == 0) {
                    setTimeout(() => {
                        alert('¡¡Has ganado!!');
                        
                        // dejar el estado como inicialmente
                        celda_seleccionada = null;
                        for( i=0; i!= document.getElementsByClassName("cell").length ;i++) {
                            document.getElementsByClassName("cell")[i].classList.add("cell-hide");
                        }
                    }, 500);

                }
            } else {
                // dejar el tablero como al principio del turno
                setTimeout(() => {
                    cell.classList.add("cell-hide");
                    celda_seleccionada.classList.add("cell-hide");
                    celda_seleccionada = null;
                }, 500);
            }
        }
    } 
}

function mismaImagen(celda1, celda2) {
    var row = null;
    var col = null;

    celda1.classList.forEach(x => {
        if (x.startsWith('col-')) {
            col = x;
        } else if (x.startsWith('row-')) {
            row = x;
        }
    });

    return celda2.classList.contains(col) && celda2.classList.contains(row);
}
