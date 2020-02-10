/**
 * On Touch event for mobiles
 */
window.addEventListener('load', function(){
            let box1 = document.getElementById('box1');
            boxCoord = box1.getBoundingClientRect();

            box1.addEventListener('touchmove', function(e) { // When the user moves their finger, the function will begin.
                
                e.preventDefault(); // Stop any annoying scrolling.
                
                var touch = e.touches[0]; // Fires every time the user moves.
                    
                var posY = touch.pageY - 25; // Get the Y position (-25 to center)
                var posX = touch.pageX - 25; // Get the X position (-25 to center)
                
                if(posY <= boxCoord.top)  posY = boxCoord.top ;
                if(posY >= boxCoord.bottom-50)  posY = boxCoord.bottom-50;

                

                if(e.touches.length == 1) { // If one finger is touching
                
                    // Creates div at current position of finger 
                    // -----------------------------------------
                    
                    var blue = document.createElement('div');
                    blue.setAttribute('class', 'blue');
                    
                    blue.style.top = posY+'px';
                    blue.style.left = posX+'px';
                    if(blue.style.top < box1)
                    document.body.appendChild(blue); 
                    
                }
                
                if(e.touches.length == 2) { // If two fingers are touching
                
                    var purple = document.createElement('div');
                    purple.setAttribute('class', 'purple');
                    
                    purple.style.top = posY+'px';
                    purple.style.left = posX+'px';
                    
                    document.body.appendChild(purple);
                
                }
                
                if(e.touches.length == 3) { // If three fingers are touching
                
                    var red = document.createElement('div');
                    red.setAttribute('class', 'red');
                    
                    red.style.top = posY+'px';
                    red.style.left = posX+'px';
                    
                    document.body.appendChild(red);
                
                }
                
            }, false);

}, false);

/**
 * mouse events
 */

 // When true, moving the mouse draws on the canvas
let isDrawing = false;
let x = 0;
let y = 0;

const myPics = document.getElementById('myPics');
const context = myPics.getContext('2d');

// The x and y offset of the canvas from the edge of the page
const rect = myPics.getBoundingClientRect();

// Add the event listeners for mousedown, mousemove, and mouseup
myPics.addEventListener('mousedown', e => {
  x = e.clientX - rect.left;
  y = e.clientY - rect.top;
  isDrawing = true;
});

myPics.addEventListener('mousemove', e => {
  if (isDrawing === true) {
    drawLine(context, x, y, e.clientX - rect.left, e.clientY - rect.top);
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
  }
});

window.addEventListener('mouseup', e => {
  if (isDrawing === true) {
    drawLine(context, x, y, e.clientX - rect.left, e.clientY - rect.top);
    x = 0;
    y = 0;
    isDrawing = false;
  }
});

function drawLine(context, x1, y1, x2, y2) {
  context.beginPath();
  context.strokeStyle = 'black';
  context.lineWidth = 1;
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
  context.closePath();
}


/**
 * Animation events
 */

let square = document.getElementById('square');
let animIterations = 0;
let cancel= document.getElementById('cancelAnimation');
let start= document.getElementById('startAnimation');

start.addEventListener('click', function(ev) {
 
    square.style.animation = "";
});

cancel.addEventListener('click', function(ev) {
    //square.style.animationName="test";
    
  square.style.animation = "test";
  square.style.webkitAnimation = "test";
  });


square.addEventListener('animationstart', (ev) => {
  alert("Animation Startted", ev);
});

square.addEventListener('animationiteration', (ev) => {
    let countSquare = document.getElementById('count');
    animIterations ++;
    countSquare.innerHTML = "Animation Iterations: "+ animIterations;
});

