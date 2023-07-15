let dimension = prompt('enter number of grid:', 4);


let grid_container = document.querySelector('.grid-container');

let gridHeight = 502/dimension;
grid_container.setAttribute('style', `display: grid;grid-template-columns: repeat(${dimension}, 1fr);grid-template-rows: repeat(${dimension}, 1fr);`)

for (let i = 0; i < Math.pow(dimension, 2); i++) {
   let grid = document.createElement('div');
   grid.setAttribute('style', `display: block; height: ${gridHeight}px; opacity: 0;`)
   grid_container.appendChild(grid);
}

let color = '#000000';
let type = 'single';
let opacity_first = 0.1;

document.querySelector('#eraseBtn').addEventListener('click', function (e) {
   type = 'single'
   color = 'ffffff'
   opacity_first = 0;
})

let colorPicker = document.querySelector('#colorPicker');

colorPicker.addEventListener('focusout', (e) => {
   type = 'single';
   color = colorPicker.value;
   opacity_first = 0.1;
})

document.querySelector('#black').addEventListener('click', (e) => {
   type = 'single';
   color = 'black';
   opacity_first = 0.1;
})

document.querySelector('#rainbow').addEventListener('click', (e) => {
   type = 'rainbow';
   color = 'black';
   opacity_first = 0.1;
})

document.querySelector('#canvasSize').setAttribute('style', 'width: 512px; height: 512px;')

document.querySelector('#reset').addEventListener('click', function(e){
   return confirm('Sure reset?') ? location.reload() : '';
})

let grids = document.querySelectorAll('.grid-container > div');

grids.forEach(function(grid) {         

   grid.addEventListener('click', function (e) {
      paintGrid(grid, color, type, opacity_first);
   });

   grid.addEventListener('mouseover', function(e) {
     
      if (e.buttons === 1) {
         paintGrid(grid, color, type, opacity_first);
      }
   });
})

function changeGrid(grid, color = '#000000', opacity){
   if (opacity === 0) {
      let style = getComputedStyle(grid);
      let opacity = parseFloat(style.opacity);
      
      opacity = parseFloat(0);
      grid.setAttribute('style', `display: block; background-color: ${color}; height: ${gridHeight}px; opacity: ` + opacity);
    
   } else {
      let style = getComputedStyle(grid);
      let opacity = parseFloat(style.opacity);
      
      opacity += parseFloat(0.1);
      grid.setAttribute('style', `display: block; background-color: ${color}; height: ${gridHeight}px; opacity: ` + opacity);
   }
}

function getRandomColor(){
   let latters = '0123456789ABCDEF';
   let color = '#';
   for (let i = 0; i < 6; i++){
      color += latters[Math.floor(Math.random() * 16)]
   }
   return color;
}

function paintGrid(grid, color, type, opacity){

   if (type == 'rainbow') {
      let warna = getRandomColor();
      changeGrid(grid, warna, opacity);
   } else {
      changeGrid(grid, color, opacity);
   }

}