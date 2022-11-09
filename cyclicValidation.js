// let sheetStorage = [];
// let storage = [];
// for(let i = 0; i < row; i++) {
//     let row = [];
//     for(let j = 0; j < col; j++) {
//         let col = [];
//         row.push(col);
//     }
//     storage.push(row);
// }
// sheetStorage.push(storage);

function isGraphCyclic(storage) {
    let visited = [];
    let dfsVisited = [];
    for(let i = 0; i < row; i++) {
        let visitedRow = [];
        let dfsVisitedRow = [];
        for(let j = 0; j < col; j++) {
            visitedRow.push(false);
            dfsVisitedRow.push(false);
        }
        visited.push(visitedRow);
        dfsVisited.push(dfsVisitedRow);
    }
    for(let i = 0; i < row; i++) {
        for(let j = 0; j < col; j++) {
            if(visited[i][j] === false) {
                let isCycle = detectCycle(storage, i, j, visited, dfsVisited);
                if(isCycle === true) {
                    return [i, j];
                }
            }
        }
    }
    return null;
}
// start -> mark visited dfs visited true 
// end -> mark dfsVisited false since it will be removed from stack trace and no cycle for current component
function detectCycle(storage, rsrc, csrc, visited, dfsVisited) {
    visited[rsrc][csrc] = true;
    dfsVisited[rsrc][csrc] = true;
    for(let child = 0; child < storage[rsrc][csrc].length; child++) {
        let [crid, ccid] = storage[rsrc][csrc][child];
        if(visited[crid][ccid] === false) {
            let isCyclic = detectCycle(storage, crid, ccid, visited, dfsVisited);
            if(isCyclic === true) {
                return true;
            }
        }
        else if(visited[crid][ccid] === true && dfsVisited[crid][ccid] === true) {
            return true;
        }
    }
    dfsVisited[rsrc][csrc] = false;
    return false;
}