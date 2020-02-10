let theZoomPic = document.getElementById('zoomPic');
let zoomBGSize = window.getComputedStyle(theZoomPic).getPropertyValue('background-size');
    

document.getElementById('zoom').onclick = function() {
  if(!theZoomPic.classList.contains('zoom'))
  {
    theZoomPic.classList.add('zoom');
  } 
}
document.getElementById('pause').onclick = function() {
    let computedStyle = window.getComputedStyle(theZoomPic),
        backgroundSize = computedStyle.getPropertyValue('background-size');
    theZoomPic.style.backgroundSize = backgroundSize;
    theZoomPic.classList.remove('zoom');
  }
document.getElementById('zoomout').onclick = function() {
  theZoomPic.classList.remove('zoom');
  theZoomPic.style.backgroundSize= zoomBGSize;
}

/**
 * Animated Heart
 */



