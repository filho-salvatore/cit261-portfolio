/**
 * On Touch event for mobiles
 */

addEventListener('touchmove', function(e) { // When the user moves their finger, the function will begin.
     
    e.preventDefault(); // Stop any annoying scrolling.
 
    var touch = e.touches[0]; // Fires every time the user moves.
         
    var posY = touch.pageY - 25; // Get the Y position (-25 to center)
    var posX = touch.pageX - 25; // Get the X position (-25 to center)
     
    if(e.touches.length == 1) { // If one finger is touching
     
        // Creates div at current position of finger 
        // -----------------------------------------
         
        var blue = document.createElement('div');
        blue.setAttribute('class', 'blue');
        blue.setAttribute('class' ,'added');
        blue.style.top = posY+'px';
        blue.style.left = posX+'px';
         
        document.body.appendChild(blue); 
         
    }
     
    if(e.touches.length == 2) { // If two fingers are touching
     
        var purple = document.createElement('div');
        purple.setAttribute('class', 'purple');
        purple.setAttribute('class' ,'added');

        purple.style.top = posY+'px';
        purple.style.left = posX+'px';
         
        document.body.appendChild(purple);
     
    }
     
    if(e.touches.length == 3) { // If three fingers are touching
     
        var red = document.createElement('div');
        red.setAttribute('class', 'red');
        red.setAttribute('class' ,'added');

        red.style.top = posY+'px';
        red.style.left = posX+'px';
         
        document.body.appendChild(red);
     
    }
     
}, false);

$('div').on('mousedown mouseup', function mouseState(e) {
    if (e.type == "mousedown") {
        //code triggers on hold
        console.log("hold");
    }
});



function clear(){

   let addedElements = document.getElementsByClassName('added');
   for (var i = 0; i < addedElements.length; i++) {
    
    addedElements[i].parentNode.removeChild(addedElements[i]);
    //Do something
    }

}


let parent = document.getElementById('parent');
parent.onmouseover = parent.onmouseout = parent.onmousemove = handler;

function handler(event) {
  let type = event.type;
  while (type < 11) type += ' ';

  log(type + " target=" + event.target.id)
  return false;
}


function clearText() {
  text.value = "";
  lastMessage = "";
}

let lastMessageTime = 0;
let lastMessage = "";
let repeatCounter = 1;

function log(message) {
  if (lastMessageTime == 0) lastMessageTime = new Date();

  let time = new Date();

  if (time - lastMessageTime > 500) {
    message = '------------------------------\n' + message;
  }

  if (message === lastMessage) {
    repeatCounter++;
    if (repeatCounter == 2) {
      text.value = text.value.trim() + ' x 2\n';
    } else {
      text.value = text.value.slice(0, text.value.lastIndexOf('x') + 1) + repeatCounter + "\n";
    }

  } else {
    repeatCounter = 1;
    text.value += message + "\n";
  }

  text.scrollTop = text.scrollHeight;

  lastMessageTime = time;
  lastMessage = message;
}