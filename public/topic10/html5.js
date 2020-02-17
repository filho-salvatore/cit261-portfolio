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
   

let videoTag = document.getElementById('videoTag');   
let videlem = document.createElement("video");
videlem.setAttribute("controls", "controls");
videlem.setAttribute("width","320");
videlem.setAttribute("height","240");
/// ... some setup like poster image, size, position etc. goes here...
/// now, add sources:
let sourceMP4 = document.createElement("source"); 
sourceMP4.type = 'video/webm;codecs="vp8, vorbis"';
sourceMP4.src = "Dance_Monkey-Choreography.webm";
videlem.appendChild(sourceMP4);

function seeVideo(){

videoTag.appendChild(videlem);
}