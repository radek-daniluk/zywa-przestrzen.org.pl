//Get the button:
mybutton = document.getElementById("backToTopButton");
console.log('mybutton=' + mybutton);

// When the user scrolls down 20px from the top of the document, show the button
parallaxDiv.addEventListener("scroll", hideOrShowButton, true);


function hideOrShowButton() {
  console.log('hideOrShowButton');
  if (parallaxDiv.scrollTop > parallaxDiv.offsetHeight) {
    console.log('show button');
    mybutton.style.opacity = "1";
  } else {
    console.log('hide button');
    mybutton.style.opacity = "0";
  }
}

// When the user clicks on the button, scroll to the top of the document
function backToTop() {
  // parallax.scroll({top:0, left:0, behavior:'smooth'});
  parallax.scrollTop = 0;
}
