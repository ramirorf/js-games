
var celda_seleccionada=null;
var celdas_descubiertas=[];

function init() {
    const boardElement = document.querySelector('.board');

    // Crear las celdas del tablero
    for (let i = 0; i < 30; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell row-' + Math.floor(i/6) + ' col-' + i%6 + ' cell-hide';
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
            setTimeout(() => {
                cell.classList.add("cell-hide");
                celda_seleccionada.classList.add("cell-hide");
                celda_seleccionada = null;
            }, 500)
        }
    } 
}


