function assert(toCheck) {
  if(toCheck === true) {
    return true;
  }
  else {
    console.error("assertionError!!!!!!!!!!!!!!!!");
    return false;
  }
}

var tempMains = document.querySelectorAll('main.page-content');
assert(tempMains.length === 1);
var main = tempMains[0];

var parallaxDiv = document.getElementById('parallax-main')

window.addEventListener("load", startAdding, true);

var minHeight = 900;
function startAdding() {
  var mainHeight = main.offsetHeight;
  if(mainHeight > minHeight) {
    addSprites(mainHeight);
  }
}

function addSprites(mainHeight) {
  var logoHtml = [
    "<svg class='sprite' viewBox='0 0 751 752' preserveAspectRatio='xMidYMin slice'><use href='#logo2'/></<svg>",
    "<svg class='sprite' viewBox='0 0 2000 2000' preserveAspectRatio='xMidYMin slice'><use href='#logo3'/></<svg>",
    "<svg class='sprite' viewBox='0 0 2000 2000' preserveAspectRatio='xMidYMin slice'><use href='#logo1'/></<svg>"
  ];

  var space = 1000;
  var spritesCount = (mainHeight-minHeight)/space;
  for(i=0; i<spritesCount; i++) {
    addSprite(logoHtml[i%(logoHtml.length)], i*space + minHeight);
  }
}

function addSprite(innerHtml, topAddition) {
  var spriteWidth = Math.random()*50 + 10;
  var top = topAddition + Math.random()*30;
  var left = Math.random()*100;

  var newDiv = document.createElement('div');
  newDiv.className = 'parallax-layer parallax-back dynamically-added';
  newDiv.style = `top:${top}px; width:${spriteWidth}%; left:${left}%; `;
  newDiv.innerHTML = innerHtml;

  parallaxDiv.appendChild(newDiv);
}

//TODO change top left on Resize
