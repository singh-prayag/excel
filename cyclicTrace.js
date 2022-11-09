function colorPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 1000)
    })
}

async function cyclicTrace(storage, cyclicResponse) {
    let [rsrc, csrc] = cyclicResponse;
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
    let response = await showCyclicTrace(storage, rsrc, csrc, visited, dfsVisited);
    // console.log(rsrc, csrc);
    if(response === true) {
        return Promise.resolve(true);
    }
    return Promise.resolve(false);
}

async function showCyclicTrace(storage, rsrc, csrc, visited, dfsVisited) {
    visited[rsrc][csrc] = true;
    dfsVisited[rsrc][csrc] = true;
    let cell = document.querySelector(`.cell[row-id="${rsrc+1}"][col-id="${csrc + 1}"]`);
    cell.style.backgroundColor = "lightblue";
    await colorPromise();
    for(let child = 0; child < storage[rsrc][csrc].length; child++) {
        let [nr, nc] = storage[rsrc][csrc][child];
        if(visited[nr][nc] === false) {
            let response = await showCyclicTrace(storage, nr, nc, visited, dfsVisited);
            if(response === true) {
                cell.style.backgroundColor = "transparent";
                await colorPromise();
                return Promise.resolve(true);
            }
        }
        else if(visited[nr][nc] === true && dfsVisited[nr][nc] === true) {
            let cyclicCell = document.querySelector(`.cell[row-id = "${nr +1}"][col-id = "${nc + 1}"]`);
            cyclicCell.style.backgroundColor = "grey";
            await colorPromise();
            cyclicCell.style.backgroundColor = "transparent";
            cell.style.backgroundColor = "pink";
            await colorPromise();
            return Promise.resolve(true);
        }
    }
    dfsVisited[rsrc][csrc] = false;
    return Promise.resolve(false);
}