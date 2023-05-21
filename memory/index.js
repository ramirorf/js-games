
var celda_seleccionada=null;
var celdas_descubiertas=[];

function init() {
    const boardElement = document.querySelector('.board');

    // Crear las celdas del tablero
    for (let i = 0; i < 30; i++) {
        const cell = document.createElement('div');
//        cell.className = 'cell row-' + Math.floor(i/6) + ' col-' + i%6 + ' cell-hide';
        cell.className = 'cell row-' + 0 + ' col-' + 0 + ' cell-hide';
        cell.addEventListener('click', () => cellClick(cell));
        boardElement.appendChild(cell);

        celdas_descubiertas[i]=false;
    }
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
