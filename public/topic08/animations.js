let theHertPicture = document.getElementById('heartPic');
let zoomBGSize = window.getComputedStyle(theHertPicture).getPropertyValue('background-size');
    
/**
 * vent Handler to give zoom to the picture
 */
document.getElementById('zoom').onclick = function() {
  if(!theHertPicture.classList.contains('zoom'))
  {
    theHertPicture.classList.add('zoom');
  } 
}

/**
 * Event Handler to pause the zoom transform
 */
document.getElementById('pause').onclick = function() {
    let computedStyle = window.getComputedStyle(theHertPicture),
        backgroundSize = computedStyle.getPropertyValue('background-size');
    theHertPicture.style.backgroundSize = backgroundSize;
    theHertPicture.classList.remove('zoom');
  }

  /**
   * Event Handler to remove the zoom from the picture
   */
  document.getElementById('zoomout').onclick = function() {
  theHertPicture.classList.remove('zoom');
  theHertPicture.style.backgroundSize= zoomBGSize;
}

/**
 * Event Handler to stop the heart animation
 */
stopbtn.addEventListener("click", function(){
	heart.style.animation = "infinite";
	heart.style.webkitAnimation = "infinite";
});

/**
 * Event Handler to start the heart animation
 */
startbtn.addEventListener("click", function(){
	heart.style.animation = "";
	heart.style.webkitAnimation = "";
});
