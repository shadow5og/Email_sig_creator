// Retrieve the elements
var logoShine = document.querySelector(".logo-shine");

// Reset the colour animation every 10 seconds
let logoShineInterval = setInterval(() => {
  logoShine.classList.remove("shine-animation");

  void logoShine.offsetWidth;

  logoShine.classList.add("shine-animation");
}, 10000);

function yearGet() {
    let d = new Date();
    let thisYear = d.getFullYear();
    element = document.querySelector("#copyrightYear");
    element.innerText = thisYear;
}

// Retrieve the banner image and grab the most dominant colour from it so that it can be used
// on the social media icons
// Imgcolr.setSwf('http://static.bar.com/dir/imgcolr.swf');

// var imgs = $('imsLOGO');

// imgs.imgcolr(function (imsLOGO, color) {
//   // `img` refers to the current img element
//   console.log(img);
//   // `color` is the grabbed color, a string like "#ededed"
//   console.log(color);
// });
