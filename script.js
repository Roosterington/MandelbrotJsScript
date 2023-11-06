/** @type {HTMLCanvasElement} */
const canvas = document.querySelector(".canvas");
/**@type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");
const WIDTH = (canvas.width = 700);
const HEIGHT = (canvas.height = 400);

let REAL_SET = {start: -2, end: 1};
let IMAGINARY_SET = {start: -1, end: 1};
let xy = {x: 0, y:0};
const colors = ["#fa3205","#f5310a","#f0300f","#eb2f14","#e62e1a","#e02d1f","#db2c24","#d62b29","#d12a2e","#cc2933","#c72838","#c2273d","#bd2642","#b82547","#b3244d","#ad2352","#a82257","#a3215c","#9e2061","#991f66","#941e6b","#8f1d70","#8a1c75","#851b7a","#801a7f","#7a1885","#75178a","#70168f","#6b1594","#661499","#61139e","#5c12a3","#5711a8","#5210ad","#4d0fb3","#470eb8","#420dbd","#3d0cc2","#380bc7","#330acc","#2e09d1","#2908d6","#2407db","#1f06e0","#1a05e5","#1404eb","#0f03f0","#0a02f5","#0501fa", "#000000"]

const buttonleft = document.querySelector("#panleft"),
buttonright = document.querySelector("#panright"),
buttonup = document.querySelector("#panup"),
buttondown = document.querySelector("#pandown"),
buttonzoomin = document.querySelector("#zoomin"),
buttonzoomout = document.querySelector("#zoomout")

draw();

buttonleft.onclick = function() {
  REAL_SET.start -= 0.1*Math.abs(REAL_SET.start);
  REAL_SET.end -= 0.1*Math.abs(REAL_SET.end);
  draw()
}
buttonright.onclick = function() {
  REAL_SET.start += 0.1*Math.abs(REAL_SET.start);
  REAL_SET.end += 0.1*Math.abs(REAL_SET.end);
  draw()
}
buttonup.onclick = function() {
  IMAGINARY_SET.start -= 0.1*Math.abs(IMAGINARY_SET.start);
  IMAGINARY_SET.end -= 0.1*Math.abs(IMAGINARY_SET.end);
  draw()
}
buttondown.onclick = function() {
  IMAGINARY_SET.start += 0.1*Math.abs(IMAGINARY_SET.start);
  IMAGINARY_SET.end += 0.1*Math.abs(IMAGINARY_SET.end);
  draw()
}
buttonzoomin.onclick = function() {
  REAL_SET.start += 0.1*Math.abs(REAL_SET.start);
  REAL_SET.end -= 0.1*Math.abs(REAL_SET.end);
  IMAGINARY_SET.start += 0.1*Math.abs(IMAGINARY_SET.start);
  IMAGINARY_SET.end -= 0.1*Math.abs(IMAGINARY_SET.end);
  draw()
  console.log(`${REAL_SET.start}, ${REAL_SET.end}, ${IMAGINARY_SET.start}, ${IMAGINARY_SET.end}`);
}
buttonzoomout.onclick = function() {
  REAL_SET.start -= 0.1;
  REAL_SET.end += 0.1;
  IMAGINARY_SET.start -= 0.1;
  IMAGINARY_SET.end += 0.1;
  draw()
}



function draw() {
    for (let i = 0; i < WIDTH; i++) {
        for (let j = 0; j < HEIGHT; j++) {

            complex = {
                x: REAL_SET.start + (i/WIDTH) * (REAL_SET.end - REAL_SET.start),
                y: IMAGINARY_SET.start + (j/HEIGHT) * (IMAGINARY_SET.end - IMAGINARY_SET.start)
            };

            const [m, isMandelbrotSet] = mandelbrot(complex, 50);
            ctx.fillStyle = `rgb(${m*8},${m*8},${m*8})`;
            ctx.fillRect(i, j, 1, 1);
        }
    }
}

function mandelbrot(c, MAX_ITERATION) {
    let z = {x: xy.x, y: xy.y}, n = 0, p, d;
    do {
        p = {
            x: Math.pow(z.x, 2) - Math.pow(z.y, 2),
            y: 2 * z.x * z.y
        };
        z = {
            x: p.x + c.x,
            y: p.y + c.y
        };
        d = Math.sqrt(Math.pow(z.x, 2) + Math.pow(z.y, 2));
        n += 1;
    } while (d <= 2 && n < MAX_ITERATION);
    return [n, d <= 2];
}