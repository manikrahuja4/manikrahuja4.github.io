// date time

async function display_ct7() {
  let url = "https://ipinfo.io/json?token=1190e798ee762d";

  let response = await fetch(url);
  let data = await response.json();
  // mark.innerHTML = ;

  var x = new Date();
  var ampm = x.getHours() >= 12 ? " PM" : " AM";
  hours = x.getHours() % 12;
  hours = hours ? hours : 12;
  hours = hours.toString().length == 1 ? 0 + hours.toString() : hours;

  var minutes = x.getMinutes().toString();
  minutes = minutes.length == 1 ? 0 + minutes : minutes;

  var seconds = x.getSeconds().toString();
  seconds = seconds.length == 1 ? 0 + seconds : seconds;

  var month = (x.getMonth() + 1).toString();
  month = month.length == 1 ? 0 + month : month;

  var dt = x.getDate().toString();
  dt = dt.length == 1 ? 0 + dt : dt;

  var x1 = dt + "/" + month + "/" + x.getFullYear();
  x1 = x1 + " - " + hours + ":" + minutes + " " + ampm;
  // document.getElementById("ct7").innerHTML = x1;
  fetch("http://ip-api.com/json")
    .then((response) => response.json())
    .then((data) => {
      const city = data.city;
      const country = data.country;
      console.log(`Current location: ${city}, ${country}`);
      document.getElementById("ct7").innerHTML =
        x1 + " - " + `${city}, ${country}`;
    })
    .catch((error) => {
      console.error("Error fetching current location", error);
    });
  display_c7();
}
function display_c7() {
  var refresh = 1000;
  mytime = setTimeout("display_ct7()", refresh);
}
display_c7();

//  page visits

function liveViews(response) {
  document.getElementById("visits").innerText = response.value;
}

// menu show / menu hide

function show() {
  var hidden = document.getElementById("hidden-nav");
  hidden.style.left = "0";
}
function hide() {
  var hidden = document.getElementById("hidden-nav");
  hidden.style.left = "-300px";
}

// navbar onscroll

let nav = document.querySelector(".top-nav");
var logo_off_scroll = document.getElementById("logo-off-scroll");
window.onscroll = function () {
  if (document.documentElement.scrollTop > 100) {
    nav.classList.add("scroll-on");
    logo_off_scroll.setAttribute("src", "images/logoL-onscroll.svg");
    logo_off_scroll.style.width = "4rem";
  } else {
    nav.classList.remove("scroll-on");
    logo_off_scroll.style.width = "7rem";
    logo_off_scroll.setAttribute("src", "images/logoD.svg");
  }
};

// const activePage = window.location.pathname;
// const navLinks = document.querySelectorAll('ul li a');
// forEach(link => {
// if(link.href.includes(`${activePage}`)){
//  console.log(`${activePage}`);
// }
// })

function updateProgressBar() {
  const { scrollTop, scrollHeight } = document.documentElement;
  const scrollPercent =
    (scrollTop / (scrollHeight - window.innerHeight)) * 100 + "%";
  document
    .querySelector("#progress-bar")
    .style.setProperty("--progress", scrollPercent);
}

document.addEventListener("scroll", updateProgressBar);

let slider = document.getElementById("category-divs");

let buttonRight = document.getElementById("scroll-right");
let buttonLeft = document.getElementById("scroll-left");

buttonLeft.addEventListener("click", function () {
  slider.scrollLeft -= 200;
});

buttonRight.addEventListener("click", function () {
  slider.scrollLeft += 200;
});

const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
