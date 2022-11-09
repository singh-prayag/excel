let copy = document.querySelector(".copy");
let paste = document.querySelector(".paste");
let cut = document.querySelector(".cut");
let ctrlKey;
document.addEventListener("keydown", (e) => {
    ctrlKey = e.ctrlKey;
    // console.log(ctrlKey);
})
document.addEventListener("keyup", (e) => {
    ctrlKey = false;
    // console.log(ctrlKey);
})
for(let i = 0; i < allCells.length; i++) {
    addSelectListener(allCells[i]);
}
let selectedCells = [];
function addSelectListener(cell) {
    cell.addEventListener("click", (e) => {
        if(!ctrlKey) return;
        if(selectedCells.length >= 2) {
            changeSelectedCells();
            selectedCells = [];
        }
        cell.style.border = "3px solid #0f793f";
        let rid = cell.getAttribute("row-id") - 1;
        let cid = cell.getAttribute("col-id") - 1;
        // console.log(rid, cid);
        selectedCells.push([rid, cid]);
    })
}

function changeSelectedCells() {
    for(let i = 0; i < selectedCells.length; i++) {
        // let cell = document.querySelector(`.cell[row-id="${selectedCells[i+0][0]}"][col-id="${selectedCells[i][1]}"]`)
        let rid = selectedCells[i][0] + 1;
        let cid = selectedCells[i][1] + 1;
        let cell = document.querySelector(`.cell[row-id="${rid}"][col-id="${cid}"]`);
        cell.style.border = "1px solid";
    }
}
let copyCells = [];
copy.addEventListener("click", (e) => {
    if(selectedCells.length === 2) {
        let sr = selectedCells[0][0];
        let sc = selectedCells[0][1];
        let er = selectedCells[1][0];
        let ec = selectedCells[1][1];
        for(let i = sr; i <= er; i++) {
            let copyRow = [];
            for(let j = sc; j <= ec; j++) {
                let cellProp = cellArr[i][j];
                copyRow.push(cellProp);
            }
            copyCells.push(copyRow);
        }
        changeSelectedCells();
    }
})
paste.addEventListener("click", (e) => {
    // console.log("clicked");
    if(selectedCells.length < 2) {
        return;
    }
    let address = addressBar.value;
    let [rid, cid] = getRidAndCid(address);
    let rDiff = Math.abs(selectedCells[0][0] - selectedCells[1][0]);
    let cDiff = Math.abs(selectedCells[0][1] - selectedCells[1][1]);
    for(let i = rid, k = 0; i <= rid + rDiff; i++, k++) {
        for(let j = cid, m = 0; j <= cid + cDiff; j++, m++) {
            let cell = document.querySelector(`.cell[row-id="${i+1}"][col-id="${j+1}"]`)
            if(!cell) return;
            let data = copyCells[k][m];
            let cellProp = cellArr[i][j];
            cellProp.isBold = data.isBold;
            cellProp.isItalic = data.isItalic;
            cellProp.isUnderlined = data.isUnderlined;
            cellProp.alignment = data.alignment;
            cellProp.fontColor = data.fontColor;
            cellProp.bgColor = data.bgColor;
            cellProp.fontSize = data.fontSize;
            cellProp.fontFamily = data.fontFamily;
            cellProp.value = data.value; 
            cell.click();
        }
    } 
})
cut.addEventListener("click", (e) => {
    console.log("cut");
    if(selectedCells.length < 2) return;
    let sr = selectedCells[0][0];
    let sc = selectedCells[0][1];
    let dr = selectedCells[1][0];
    let dc = selectedCells[1][1];
    for(let i = sr; i <= dr; i++) {
        for(let j = sc; j <= dc; j++) {
            let cell = document.querySelector(`.cell[row-id="${i+1}"][col-id="${j+1}"]`);
            let cellProp = cellArr[i][j];
            cellProp.isBold = false;
            cellProp.isItalic = false;
            cellProp.isUnderlined = false;
            cellProp.fontSize = 12;
            cellProp.fontFamily = "monospace";
            cellProp.fontColor = "#000000";
            cellProp.bgColor = "#ffc0cb";
            cellProp.value = "";
            cellProp.alignment = "left";
            cell.click();

        }
    }
    changeSelectedCells();
})