console.log("Hello world");

let width = 20;
let height = 20;
let selection = "wall";
let isPainting = false;

const HandleChange = e => {
    e.preventDefault();
    if (e.target.name == "width"){
        width = e.target.value;
    } else {
        height = e.target.value;
    }
    GenerateBoard();
}

const GenerateBoard = () => {
    ResetBoard();
    let container = document.createElement("div");
    container.className = "container";
    container.onmousedown = HandleContainerClick;
    container.onmouseup = HandleContainerUnclick;
    container.id = "container";

    document.body.appendChild(container);
    for (let x = 0; x < width; x++) {
        let row = document.createElement("div");
        row.className = "row";
        for (let y = 0; y < height; y++){
            let tile = document.createElement("div");
            tile.className = "tile";
            row.appendChild(tile);
            if (x == 0 || y == 0 || x == width - 1 || y == height - 1){
                tile.id = "wall";
                continue;
            }
            tile.id = "floor";
            tile.onmousemove = HandlePaintingTiles;
            tile.ondblclick = HandleDoubleClickTile;
        }
        container.append(row);
    }
}

const ResetBoard = () => {
    let c = document.getElementById("container");
    if (c == null) return;
    c.remove();
}

const HandlePaintingTiles = e => {
    e.preventDefault();
    if (isPainting){
        e.target.id = "";
        e.target.id = selection;
    }
}

const HandleDoubleClickTile = e => {
    e.preventDefault();
    e.target.id = "";
    e.target.id = "floor";
}

const HandleTileClick = e => {
    e.preventDefault();
    e.target.id = "";
    e.target.id = selection;
}

const HandleContainerClick = e => {
    e.preventDefault();
    isPainting = true;
}

const HandleContainerUnclick = e => {
    e.preventDefault();
    isPainting = false;
}

const HandleSelectionClick = e => {
    e.preventDefault();
    let clickedText = e.target.innerText;
    if (clickedText != selection){
        document.getElementById(selection).classList.remove("selected-element");
        document.getElementById(selection).classList.add("unselected-element");
        e.target.classList.remove("unselected-element");
        e.target.classList.add("selected-element");
        selection = e.target.innerText;
    }
}

let inputs = document.body.getElementsByTagName("input");
inputs[0].value = width;
inputs[1].value = height;
inputs[0].onchange = HandleChange;
inputs[1].onchange = HandleChange;

let selections = document.getElementById("selection-id").children;
for (let i = 0; i < selections.length; i++) {
    selections[i].onclick = HandleSelectionClick;
    if (selections[i].innerText != selection){
        selections[i].classList.add("unselected-element");
    } else {
        selections[i].classList.add("selected-element");
    }
}

const HandleDownload = e => {
    e.preventDefault();
    const content = FormatText();
    const blob = new Blob([content], {type: 'text/plain'});
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = "level.txt";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(downloadLink.href);
}

const FormatText = () => {
    let text = "";
    const rows = document.getElementById("container").children;
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i].children;
        for (let x = 0; x < row.length; x++) {
            const id = row[x].id;
            if (id == "wall"){
                text += "x";
                continue;
            }
            if (id == "floor"){
                text += "o";
                continue;
            }
            if (id == "key"){
                text += "k";
                continue;
            }
            if (id == "door"){
                text += "d";
                continue;
            }
            if (id == "exit"){
                text += "E";
                continue;
            }
            if (id == "enemy"){
                text += "e";
                continue;
            }
            if (id == "player"){
                text += "p";
                continue;
            }
            if (id == "gold"){
                text += "g";
                continue;
            }
            if (id == "gold-big"){
                text += "G";
                continue;
            }
            if (id == "gem"){
                text += "A";
                continue;
            }
        }
        text += "\n";
    }
    return text;
}

document.getElementById("download").onclick = HandleDownload;

GenerateBoard();