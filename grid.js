let row = 100;
let col = 26;

let rowheader = document.querySelector(".row-header");
let colHeader = document.querySelector(".column-header");
let cellCont = document.querySelector(".cell-cont");
let addressBar = document.querySelector(".address-bar");
addressBar.value = `A1`

for(let i = 0; i < row; i++) {
    let rowHeadElem = document.createElement("div");
    rowHeadElem.innerText = `${i+1}`;
    rowHeadElem.setAttribute("class", "row-header-elem");
    rowheader.appendChild(rowHeadElem);
}

for(let i = 0; i < col; i++) {
    let colHeadElem = document.createElement("div");
    colHeadElem.innerText = String.fromCharCode(65 + i);
    colHeadElem.setAttribute("class", "column-header-elem");
    colHeader.appendChild(colHeadElem);
}

for(let i = 0; i < row; i++) {
    let rowCellCont = document.createElement("div");
    rowCellCont.setAttribute("class", "row-cell-cont");
    for(let j = 0; j < col; j++) {
        let cell = document.createElement("div");
        cell.setAttribute("class", "cell");
        cell.setAttribute("contentEditable", true);
        cell.setAttribute("row-id", i+1);
        cell.setAttribute("col-id", j+1);
        cell.setAttribute("spellCheck", "false");
        addClickEventListener(cell, i, j);
        rowCellCont.appendChild(cell);
    }
    cellCont.appendChild(rowCellCont);
}

function addClickEventListener(cell, i, j) {
    cell.addEventListener("click", () => {
        let row = i+1;
        let col = String.fromCharCode(65+j);
        addressBar.value = `${col}${row}`;
    })
}