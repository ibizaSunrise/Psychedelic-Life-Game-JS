let canvas = document.querySelector('#life');
let ctx = canvas.getContext('2d');

let resolution = 40; 
let tileSize = canvas.width / resolution;
let field = make2DArray(resolution);
let count = 0;
let speed = 6;

canvas.addEventListener('click', function (e) {
    let x = e.offsetX;
    let y = e.offsetY;

    x = Math.floor(x / tileSize);
    y = Math.floor(y / tileSize);

    field[y][x] = 1;
    drawCell()
})

function make2DArray(a) {
    return [...new Array(a)].map(() => [...new Array(a)].map(() => 0));

}

function drawCell() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < resolution; i++) {
        for (let j = 0; j < resolution; j++) {
            if (field[i][j] == 1) {
                ctx.fillRect(j * tileSize, i * tileSize, tileSize, tileSize);
            }
        }
    }
}

function startLife() {
    let changes = [];
    for (let i = 0; i < resolution; i++) {
        changes[i] = [];
        for (let j = 0; j < resolution; j++) {
            let neighbors = 0;
            if (field[fpm(i) - 1][j] == 1) neighbors++;//up
            if (field[i][fpp(j) + 1] == 1) neighbors++;//right
            if (field[fpp(i) + 1][j] == 1) neighbors++;//bottom
            if (field[i][fpm(j) - 1] == 1) neighbors++;//left
            if (field[fpm(i) - 1][fpp(j) + 1] == 1) neighbors++;
            if (field[fpp(i) + 1][fpp(j) + 1] == 1) neighbors++;
            if (field[fpp(i) + 1][fpm(j) - 1] == 1) neighbors++;
            if (field[fpm(i) - 1][fpm(j) - 1] == 1) neighbors++;

            if (neighbors == 2 || neighbors == 3) {
                changes[i][j] = 1;
            } else {
                changes[i][j] = 0;
            }
        }
    }
    field = changes;
    drawCell();
    count++;
    document.querySelector('#count').innerHTML = count;
    timer = setTimeout(startLife, 1000 / speed);

}

function fpm(n) {
    if (n == 0) return resolution;
    else return n;
}

function fpp(n) {
    if (n == resolution - 1) return -1;
    else return n;
}

document.querySelector('#start').addEventListener('click', startLife);
document.querySelector('#stop').addEventListener('click', function () {
    window.location.reload();
})