function assert(toCheck) {
  if(toCheck === true) {
    return true;
  }
  else {
    console.error("assertionError!!!!!!!!!!!!!!!!");
    return false;
  }
}

var tempHeaders = document.querySelectorAll('header.site-header');
assert(tempHeaders.length === 1);
var header = tempHeaders[0];

var tempMains = document.querySelectorAll('main.page-content');
assert(tempMains.length === 1);
var main = tempMains[0];

var tempFooters = document.querySelectorAll('footer.site-footer');
assert(tempFooters.length === 1);
var footer = tempFooters[0];

var tempWrappers = document.querySelectorAll('main.page-content>div.wrapper');
assert(tempWrappers.length === 1);
var wrapper = tempWrappers[0];

var tempArticles = document.querySelectorAll('article.post');
assert(tempArticles.length === 1);
var article = tempArticles[0];

var tempFbContainers = document.querySelectorAll('div.facebook-container');
assert(tempArticles.length === 1);
var fbContainer = tempFbContainers[0];

window.addEventListener("load", facebookLoad, true);
window.addEventListener("resize", facebookLoadTimeout, true);

var FB_RELOAD_TIMEOUT = null;
function facebookLoadTimeout() {
  if(FB_RELOAD_TIMEOUT === null) {
    FB_RELOAD_TIMEOUT = setTimeout(facebookLoad,500);
  }
}

function facebookLoad() {
  FB_RELOAD_TIMEOUT = null;
  updateFbContainer();
}

var FB_WIDTH = 0;
function updateFbContainer() {
  var oldFbHeight = fbContainer.offsetHeight;

  newFbHeight = getFbHeight(oldFbHeight);
  newFbWidth = getFbWidth(fbContainer.offsetWidth);

  if(oldFbHeight != newFbHeight || FB_WIDTH != newFbWidth) {
    FB_WIDTH = newFbWidth;
    fbContainer.style.height = newFbHeight + "px";

    fbContainer.innerHTML = '<div class="fb-page" data-href="https://www.facebook.com/Fundacja-%C5%BBywa-Przestrze%C5%84-124083095656438/" data-tabs="timeline" data-width="'
      + newFbWidth + '" data-height="'
      + newFbHeight + '" data-small-header="true" data-adapt-container-width="false" data-hide-cover="true" data-show-facepile="false"><blockquote cite="https://www.facebook.com/Fundacja-%C5%BBywa-Przestrze%C5%84-124083095656438/" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/Fundacja-%C5%BBywa-Przestrze%C5%84-124083095656438/">Fundacja Żywa Przestrzeń</a></blockquote></div>';
    FB.XFBML.parse();
  }
}

function getFbHeight(oldFbHeight) {
  if(!oldFbHeight){
    oldFbHeight = 0;
  }
  var calculatedHeight = getEmptySpace() + oldFbHeight;
  var minHeight = 240;
  if(calculatedHeight < minHeight) {
    calculatedHeight = minHeight;
  }
  return calculatedHeight;
}

function getFbWidth(fbContainerWidth) {
  if(fbContainerWidth > 500){
    return 500;
  }else if(fbContainerWidth < 180) {
    return 180;
  }else {
    return fbContainerWidth;
  }
}

function getEmptySpace() {
  vHeight = window.innerHeight;
  vWidth = window.innerWidth;
  var shrinkedHeaderHeight = getShrinkedHeaderHeight(vHeight, vWidth);

  footerHeight = footer.offsetHeight;

  mainHeight = main.offsetHeight;
  var paddingTop = parseInt(getComputedStyle(main, null).getPropertyValue('padding-top'),10) || 0;
  var paddingBottom = parseInt(getComputedStyle(main, null).getPropertyValue('padding-bottom'),10) || 0;

  wrapperHeight = wrapper.offsetHeight;

  return vHeight - shrinkedHeaderHeight - footerHeight - paddingTop - paddingBottom - wrapperHeight;
}

function getShrinkedHeaderHeight(viewportHeight, viewportWidth) {
  var titleSecondLineHeight = (viewportWidth<250) ? 23 : 0;
  switch(true) {
    case(viewportHeight <= 600):
      return 62; //57+5
    default: // >600px
      return 98 + titleSecondLineHeight; //93+5
    }
}
