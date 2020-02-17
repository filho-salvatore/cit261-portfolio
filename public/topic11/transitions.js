/**
 * Control the transition by changing the class of the division
 */
function updateTransition() {
     let el = document.querySelector("div.box");
      
     if (el) {
       el.className = "box1";
     } else {
       el = document.querySelector("div.box1");
       el.className = "box";
     }
      
     return el;
   }
   
let intervalID = window.setInterval(updateTransition, 2000);

function fadeout(){
     
     const square = document.getElementById('clickedbox');
     square.style.opacity = '0';

}
   