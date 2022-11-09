let sheetsCellArr = []; 
let cellArr = [];
let sheetStorage = [];
let storage = [];

{
    let sheetAddBtn = document.querySelector(".sheet-add-btn");
    sheetAddBtn.click();
}

// for(let i = 0; i < row; i++) {
//     let rowArr = [];
//     for(let j = 0; j < col; j++) {
//         let colObj = {
//             isBold: false,
//             isItalic: false,
//             isUnderlined: false,
//             alignment: "left",
//             fontColor: "#000000",
//             bgColor: "#ffc0cb",
//             fontSize: 12,
//             fontFamily: "monospace",
//             value: "",
//             formula: "",
//             children: []2
//         }
//         rowArr.push(colObj);
//     }
//     cellArr.push(rowArr);
// }
// sheetsCellArr.push(cellArr);
// console.log(cellArr);

let bold = document.querySelector(".bold");
let underline = document.querySelector(".underline");
let italic = document.querySelector(".italic");
let alignments = document.querySelectorAll(".alignment");
let fontSize = document.querySelector(".font-size-prop");
let fontFamily = document.querySelector(".font-family-prop");
let textColor = document.querySelector(".text-color");
let bgColor = document.querySelector(".bg-color");
let leftAlign = alignments[0];
let centerAlign = alignments[1];
let rightAlign = alignments[2];

let activeColorProp = "#d1d8e0";
let inActiveColorProp = "#ecf0f1";

let allCells = document.querySelectorAll(".cell");
for(let i = 0; i < allCells.length; i++) {
    addEventListenerForProps(allCells[i]);
}
function addEventListenerForProps(cell) {
    cell.addEventListener("click", (e) => {
        // console.log("clicked");
        let address = addressBar.value;
        let [rid, cid] = getRidAndCid(address);
        let cellProp = cellArr[rid][cid];
        // console.log(cellProp)

        cell.style.textDecoration = cellProp.isUnderlined ? "underline" : "none";
        cell.style.fontStyle = cellProp.isItalic ? "italic": "normal";
        cell.style.fontWeight = cellProp.isBold ? "bold" : "normal";
        cell.style.fontSize = cellProp.fontSize + "px";
        cell.style.fontFamily = cellProp.fontFamily;
        cell.style.fontColor = cellProp.fontColor;
        cell.style.textAlign = cellProp.alignment;
        cell.style.backgroundColor = cellProp.bgColor;

        bold.style.backgroundColor = cellProp.isBold ? activeColorProp : inActiveColorProp;
        underline.style.backgroundColor = cellProp.isUnderlined ? activeColorProp : inActiveColorProp;
        italic.style.backgroundColor = cellProp.isItalic ? activeColorProp : inActiveColorProp;
        fontSize.value = cellProp.fontSize;
        textColor.value = cellProp.fontColor;
        fontFamily.value = cellProp.fontFamily;
        bgColor.value = cellProp.bgColor;
        switch(cellProp.alignment) {
            case "left":
                leftAlign.style.backgroundColor = activeColorProp;
                rightAlign.style.backgroundColor = inActiveColorProp;
                centerAlign.style.backgroundColor = inActiveColorProp;
                break;
            case "right":
                leftAlign.style.backgroundColor = inActiveColorProp;
                rightAlign.style.backgroundColor = activeColorProp;
                centerAlign.style.backgroundColor = inActiveColorProp;
                break;
            case "center":
                leftAlign.style.backgroundColor = inActiveColorProp;
                rightAlign.style.backgroundColor = inActiveColorProp;
                centerAlign.style.backgroundColor = activeColorProp;
        }
        let formula = document.querySelector(".formula");
        formula.value = cellProp.formula;
        cell.innerText = cellProp.value;

    })
}
bold.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);
    // console.log(cell);
    // console.log(cellProp);
    cellProp.isBold = !cellProp.isBold;
    cell.style.fontWeight = cellProp.isBold ? "bold" : "normal";
    bold.style.backgroundColor = cellProp.isBold ? activeColorProp : inActiveColorProp;
})
underline.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);
    cellProp.isUnderlined = !cellProp.isUnderlined;
    cell.style.textDecoration = cellProp.isUnderlined ? "underline" : "none";
    underline.style.backgroundColor = cellProp.isUnderlined ? activeColorProp : inActiveColorProp
})
italic.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);
    cellProp.isItalic = !cellProp.isItalic;
    cell.style.fontStyle = cellProp.isItalic ? "italic" : "normal";
    italic.style.backgroundColor = cellProp.isItalic ? activeColorProp : inActiveColorProp;
})
fontSize.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);
    cellProp.fontSize = fontSize.value;
    cell.style.fontSize = cellProp.fontSize + "px";
    fontSize.value = cellProp.fontSize;
})
fontFamily.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);
    cellProp.fontFamily = fontFamily.value;
    cell.style.fontFamily = cellProp.fontFamily;
    fontFamily.value = cellProp.fontFamily;
})
textColor.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);
    cellProp.fontColor = textColor.value;
    cell.style.color = cellProp.fontColor;
    textColor.value = cellProp.fontColor; 
})
bgColor.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);
    cellProp.bgColor = bgColor.value;
    cell.style.backgroundColor = cellProp.bgColor;
    bgColor.value = cellProp.bgColor;
})
alignments.forEach((align) => {
    align.addEventListener("click", (e) => {
        let address = addressBar.value;
        let [cell, cellProp] = getCellAndCellProp(address);
        let al = e.target.classList[0];
        cellProp.alignment = al;
        cell.style.textAlign = cellProp.alignment;
        switch(al) {
            case "left": 
                leftAlign.style.backgroundColor = activeColorProp;
                rightAlign.style.backgroundColor = inActiveColorProp;
                centerAlign.style.backgroundColor = inActiveColorProp;
                break;
            case "right":
                rightAlign.style.backgroundColor = activeColorProp;
                leftAlign.style.backgroundColor = inActiveColorProp;
                centerAlign.style.backgroundColor = inActiveColorProp;
                break;
            case "center":
                centerAlign.style.backgroundColor = activeColorProp;
                leftAlign.style.backgroundColor = inActiveColorProp;
                rightAlign.style.backgroundColor = inActiveColorProp; 
                break;
            default:
                break;
        }
    })
})

function getCellAndCellProp(address) {
    let [rid, cid] = getRidAndCid(address);
    let cell = document.querySelector(`.cell[row-id = "${rid+1}"][col-id="${cid+1}"]`);
    let cellProp = cellArr[rid][cid];
    return [cell, cellProp];
}
function getRidAndCid(address) {
    let rid = Number(address.slice(1))-1;
    let cid = Number(address.charCodeAt(0)) - 65;
    return [rid, cid]
}
