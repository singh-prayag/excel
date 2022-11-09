let sheetAddBtn = document.querySelector(".sheet-add-btn");
let sheetsCont = document.querySelector(".sheets-cont")
sheetAddBtn.addEventListener("click", (e) => {
    let sheetContent = document.createElement("div");
    sheetContent.setAttribute("class", "sheet-content");
    let AllSheets = document.querySelectorAll(".sheet-content");
    sheetContent.setAttribute("id", AllSheets.length);
    sheetContent.innerHTML = `<div class="sheet">Sheet ${AllSheets.length + 1}</div>`
    sheetsCont.appendChild(sheetContent);
    addSheetToSheetsArr();
    addStorageToSheetStorage();
    addEventListenerToSheet(sheetContent);
    removeSheet(sheetContent);
    sheetContent.click();
    addSheetAsActive(sheetContent);
})

function addSheetAsActive(sheet) {
    let allSheets = document.querySelectorAll(".sheet-content");
    for(let i = 0; i < allSheets.length; i++) {
        allSheets[i].style.backgroundColor = "transparent";
    }
    sheet.style.backgroundColor = "grey";
}

function removeSheet(sheet) {
    sheet.addEventListener("mousedown", (e) => {
        // 0 -> left 
        // 2 -> Right 
        if(e.button !== 2) return;
        let allSheets = document.querySelectorAll(".sheet-content");
        if(allSheets.length === 1) {
            alert("There should be atleast one sheet");
            return;
        }
        removeCellAndStorage(sheet);
        manageSheetUI();
        let sheet1 = document.querySelector(".sheet-content");
        sheet1.click();
    })
}

function manageSheetUI() {
    let allSheets = document.querySelectorAll(".sheet-content");
    for(let i = 0; i < allSheets.length; i++) {
        allSheets[i].setAttribute("id", i);
        let sheet = allSheets[i].querySelector(".sheet");
        sheet.innerHTML = `Sheet ${i+1}`;
    }
}

function removeCellAndStorage(sheet) {
    let sheetIdx = sheet.getAttribute("id");
    sheetsCellArr.splice(sheetIdx, 1);
    sheetStorage.splice(sheetIdx, 1);
    // console.log(sheetsCellArr);
    // console.log(sheetStorage);
    sheet.remove();
}

function addSheetToSheetsArr() {
    let cellArr = [];
    for(let i = 0; i < row; i++) {
        let rowArr = [];
        for(let j = 0; j < col; j++) {
            let colObj = {
                isBold: false,
                isItalic: false,
                isUnderlined: false,
                alignment: "left",
                fontColor: "#000000",
                bgColor: "#ffc0cb",
                fontSize: 12,
                fontFamily: "monospace",
                value: "",
                formula: "",
                children: []
            }
            rowArr.push(colObj);
        }
        cellArr.push(rowArr);
    }
    sheetsCellArr.push(cellArr);
    // console.log(sheetsCellArr);
}

function addStorageToSheetStorage() {
    for(let i = 0; i < row; i++) {
        let row = [];
        for(let j = 0; j < col; j++) {
            let col = [];
            row.push(col);
        }
        storage.push(row);
    }
    sheetStorage.push(storage);
    // console.log(sheetStorage);
}

function addEventListenerToSheet(sheet) {
    sheet.addEventListener("click", (e) => {
        let sheetIdx = sheet.getAttribute("id");
        // console.log(sheetIdx);
        cellArr = sheetsCellArr[sheetIdx];
        storage = sheetStorage[sheetIdx];
        addClickToEveryCell(sheetIdx);
        addSheetAsActive(sheet);
        sheet.scrollIntoView();
    })
}

function addClickToEveryCell() {
    for(let i = 0; i < row; i++) {
        for(let j = 0; j < col; j++) {
            let cell = document.querySelector(`.cell[row-id="${i+1}"][col-id="${j+1}"]`);
            cell.click();
        }
    }
    let cell = document.querySelector(".cell[row-id='1'][col-id='1']");
    cell.click();
}