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

