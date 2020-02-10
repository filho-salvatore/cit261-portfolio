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
         
        blue.style.top = posY+'px';
        blue.style.left = posX+'px';
         
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


function clear(){

   let addedElements = document.getElementsByClassName('added');
   for (var i = 0; i < addedElements.length; i++) {
    
    addedElements[i].parentNode.removeChild(addedElements[i]);
    //Do something
    }

}


