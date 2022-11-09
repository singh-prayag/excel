let download = document.querySelector(".download");
let open = document.querySelector(".open");

download.addEventListener("click", (e) => {
    // console.log("clicked");
    let jsonData = JSON.stringify([cellArr, storage]);
    let file = new Blob([jsonData], {type: "application/json"});
    // console.log(file);
    let a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.download = "SheetData.json";
    a.click();
})

open.addEventListener("click", (e) => {
    let input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();
    input.addEventListener("change", (e) => {
        let file = e.target.files[0];
        // console.log(file);
        let fr = new FileReader();
        fr.readAsText(file);
        fr.addEventListener("load", (e) => {
            let sheetData = JSON.parse(fr.result);
            // console.log(sheetData);
            sheetAddBtn.click();
            cellArr = sheetData[0];
            storage = sheetData[1];
            sheetsCellArr[sheetsCellArr.length-1] = cellArr;
            sheetStorage[sheetStorage.length-1] = storage;
            addClickToEveryCell();
        }) 
        // let data = JSON.parse(file);
        // console.log(data);
    })
})