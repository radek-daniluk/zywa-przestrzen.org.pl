var logo = document.getElementById('logo-a');
var logowrap = document.getElementById('logowrap');
var shrinked = false;
var shrinkedWidth = '100px';

document.body.onload = function() {init()};

function init() {
  if(document.scrollingElement.scrollTop > 10){
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
    logowrap.style.transition = 'width ' + logoTransitionTime;
    logowrap.offsetWidth; //force repaint

    logo.style.transition = 'all ' + logoTransitionTime;
    setShrinkClass();

    logowrap.style.width = shrinkedWidth;
  }
}
