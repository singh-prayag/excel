let formula = document.querySelector(".formula");
for(let i = 0; i < row; i++) {
    for(let j = 0; j < col; j++) {
        let cell = document.querySelector(`.cell[row-id="${i+1}"][col-id="${j+1}"]`);
        cell.addEventListener("blur", (e) => {
            let address = addressBar.value;
            let [activeCell, cellProp] = getCellAndCellProp(address);
            let data = activeCell.innerText;
            if(cellProp.value === data) return;
            cellProp.value = data;
            removeParents(cellProp.formula);
            cellProp.formula = "";
            updateChilds(address);
        })
    }
}

formula.addEventListener("keydown", async (e) => {
    let address = addressBar.value;
    let mainFormula = formula.value;
    if(e.key === "Enter" && mainFormula) {
        let [cell, cellProp] = getCellAndCellProp(address);
        if(mainFormula != cellProp.formula) removeParents(cellProp.formula);
        addChildToGraphComponents(mainFormula, address);
        let cyclicResponse = isGraphCyclic(storage);
        if(cyclicResponse) {
            let response = confirm("Cycle is formed. Do you want to trace it.")
            while(response === true) {
                await cyclicTrace(storage, cyclicResponse);
                response = confirm("Cycle is formed. Do you want to Trace it.");
            }
            removeChildsFromGraphComponent(mainFormula, address);
            // alert("Graph is Cyclic. Please enter another formula.");
            return;
        }
        let calculatedValue = evaluateFormula(mainFormula);
        setUpUIAndData(calculatedValue, mainFormula, address);
        addChildToParent(mainFormula);
        updateChilds(address);
    }
})

function removeChildsFromGraphComponent(formula, address) {
    let splitFormula = formula.split(" ");
    for(let i = 0; i < splitFormula.length; i++) {
        let asciiCode = splitFormula[i].charCodeAt(0);
        if(asciiCode >= 65 && asciiCode <= 90) {
            let [prid, pcid] = getRidAndCid(splitFormula[i]);
            storage[prid][pcid].pop();
        }
    }
}

function addChildToGraphComponents(formula, childAddress) {
    let [rid, cid] = getRidAndCid(childAddress);
    let splitFormula = formula.split(" ");
    for(let i = 0; i < splitFormula.length; i++) {
        let asciiCode = splitFormula[i].charCodeAt(0);
        if(asciiCode >= 65 && asciiCode <= 90) {
            let [prid, pcid] = getRidAndCid(splitFormula[i]);
            storage[prid][pcid].push([rid, cid]);
            // console.log(storage[prid][pcid]);
        }
    }
}

function updateChilds(parentAddress) {
    let [parentCell, parentCellProp] = getCellAndCellProp(parentAddress);
    let childrens = parentCellProp.children;
    for(let i = 0; i < childrens.length; i++) {
        let [childCell, childCellProp] = getCellAndCellProp(childrens[i]);
        let formula = childCellProp.formula;
        let evaluatedValue = evaluateFormula(formula);
        setUpUIAndData(evaluatedValue, formula, childrens[i]);
        updateChilds(childrens[i]);
    }
}

function removeParents(formula) {
    let childAddress = addressBar.value;
    let splitFormula = formula.split(" ");
    for(let i = 0; i < splitFormula.length; i++) {
        let asciiCode = splitFormula[i].charCodeAt(0);
        if(asciiCode >= 65 && asciiCode <= 90) {
            let [parentCell, parentCellProp] = getCellAndCellProp(splitFormula[i]);
            let childrens = parentCellProp.children;
            let idx = childrens.indexOf(childAddress);
            childrens.splice(idx, 1);
            // console.log(parentCellProp);
        }
    }
}

function addChildToParent(formula) {
    let childAddress = addressBar.value;
    let splitFormula = formula.split(" ");
    for(let i = 0; i < splitFormula.length; i++) {
        let ascii = splitFormula[i].charCodeAt(0);
        if(ascii >= 65 && ascii <= 90) {
            let [parentCell, parentCellProp] = getCellAndCellProp(splitFormula[i]);
            if(!parentCellProp.children.includes(childAddress)) {
                parentCellProp.children.push(childAddress);
            }
        }
    }
}

function evaluateFormula(formula) {
    let splitFormula = formula.split(" ");
    console.log(splitFormula);
    // return eval(formula);
    for(let i = 0; i < splitFormula.length; i++) {
        let asciiCode = splitFormula[i].charCodeAt(0);
        if(asciiCode >= 65 && asciiCode <= 90) {
            let [cell, cellProp] = getCellAndCellProp(splitFormula[i]);
            splitFormula[i] = cellProp.value;
        }
    }
    let decodedFormula = splitFormula.join(" ");
    return eval(decodedFormula);
}

function setUpUIAndData(calculatedValue,  formula, address) {
    let [cell, cellProp] = getCellAndCellProp(address);
    cellProp.value = calculatedValue;
    cellProp.formula = formula;
    cell.innerText = calculatedValue;
}