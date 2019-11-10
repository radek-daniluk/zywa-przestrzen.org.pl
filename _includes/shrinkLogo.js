var logo = document.getElementById('logo-a');
var logowrap = document.getElementById('logowrap');
var shrinked = false;
var shrinkedWidth = '100px';

window.addEventListener("load", init, true);

function init() {
  if(document.scrollingElement != undefined && document.scrollingElement.scrollTop > 10){
    shrinked = true;
    setShrinkClass();
  } else {
    window.onscroll = function() {shrinkLogo()};
  }
}

function setShrinkClass() {
  if(logo.classList){
    logo.classList.add("shrink");
  }else {
    logo.className = "shrink";
  }
}

function shrinkLogo() {
  var logoTransitionTime = '.8s'
  if(shrinked === false) {
    shrinked = true;
    logowrap.style.width = getComputedStyle(logowrap).width;
    setShrinkClass();
    logowrap.offsetWidth; //force repaint
    logowrap.style.width = shrinkedWidth;
  }
}
