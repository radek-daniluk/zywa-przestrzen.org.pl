function assert(toCheck) {
  if(toCheck === true) {
    return true;
  } else {
    console.error("assertionError!!!!!!!!!!!!!!!!");
    return false;
  }
}

function getOneElementBySelector(selectorString) {
  var tempElements = document.querySelectorAll(selectorString);
  assert(tempElements.length === 1); //there are more than one mathing elements
  return tempElements[0];
}
var header = getOneElementBySelector('header.site-header');
var main = getOneElementBySelector('main.page-content');
var footer = getOneElementBySelector('footer.site-footer');

const parallaxDiv = document.getElementById('parallax-main');

window.addEventListener("load", addSprites, true);
window.addEventListener("resize", refresh, true);
parallax.addEventListener("scroll", limitScroll, true);



function addSprites() {

  var headerHeight = 80;
  if(document.documentElement.offsetHeight === parallax.scrollHeight) { // not enoough content to scroll window
    headerHeight = header.offsetHeight;
  }
  var envelopeHeight = main.offsetHeight + footer.offsetHeight;
  var spriteHeight = Math.min(parallaxDiv.offsetWidth,600);

  var topMargin = 580;
  var space = 0;
  var step = spriteHeight + space;

  var spritesNumber = Math.floor( (envelopeHeight - topMargin - space)/step );
  var lastReminder = envelopeHeight - topMargin - spriteHeight*spritesNumber - space*(spritesNumber-1);

  var count = 0;
  var top = headerHeight + topMargin + lastReminder;

  while(top <= headerHeight + envelopeHeight - spriteHeight){
    addSprite(logoHtml[count%logoHtml.length],top, count++);
    top += step;
  }
  assert(top - step === envelopeHeight + headerHeight - spriteHeight);
}


const logoHtml = [
  "<svg class='sprite' viewBox='0 0 751 752' preserveAspectRatio='xMidYMin slice'><use href='#logo2'/></<svg>",
  "<svg class='sprite' viewBox='0 0 2000 2000' preserveAspectRatio='xMidYMin slice'><use href='#logo3'/></<svg>",
  "<svg class='sprite' viewBox='0 0 2000 2000' preserveAspectRatio='xMidYMin slice'><use href='#logo1'/></<svg>"
];
const dynamicClassName = 'dynamically-added';

function addSprite(innerHtml, top, count) {
  var isOdd = count%2;
  // var isOddInSide = (count>>1)%2
  var side = isOdd ? 'right:' : 'left:';
  var perspective = - (Math.random()*2 + 1);
  var sidePosition = -300 + Math.min(300, main.offsetWidth/10) +(perspective+1)*10; //Math.random()*(-80);
  var zIndex = Math.floor(perspective*100);
  // console.log('newSprite: top=' + top + ' ' + side + sidePosition  + ' perspective=' + perspective );

  var newDiv = document.createElement('div');
  newDiv.className = 'parallax-layer sprite-d ' + dynamicClassName;
  newDiv.style = `top:${top}px; ${side}${sidePosition}%; transform: translateZ(${perspective}px)scale(2); z-index:${zIndex};`;
  newDiv.innerHTML = innerHtml;

  parallaxDiv.appendChild(newDiv);
}



footerScrollLimit = Number.MAX_VALUE;
function refresh(){
  updateFooterScrollLimit();
  console.log('rifresz');
  var spriteDivs = document.getElementsByClassName(dynamicClassName);
  const toRemoveNumber = spriteDivs.length
  for(var i=toRemoveNumber-1; i>=0; i--) {
    parallaxDiv.removeChild(spriteDivs[i]);
  }
  addSprites();
}

firstTime = true;
var currScrollLimit;

function limitScroll() {
  if(firstTime){
    firstTime = false;
    updateFooterScrollLimit();
  }
  clearTimeout(currScrollLimit);
  if(parallax.scrollTop > footerScrollLimit ){
    currScrollLimit = setTimeout(scrollToLimit, 200);
  }
}

function scrollToLimit(){
  parallax.scroll({top:footerScrollLimit, left:0, behavior:'smooth'});
}

function updateFooterScrollLimit(timeout = 800){
  footerScrollLimit = footer.offsetTop + footer.offsetHeight - parallaxDiv.offsetHeight; // Immediately set coarse limit value.
  setTimeout(function() {
    footerScrollLimit = footer.offsetTop + footer.offsetHeight - parallaxDiv.offsetHeight; // Set accurate limit (after animations/transitions).
  }, timeout);
}
