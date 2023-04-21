document.querySelectorAll('.s2Options')[1].addEventListener('click', function () {
  document.querySelectorAll('.s2Options')[0].classList.remove('s2Selected');
  document.querySelectorAll('.s2Options')[1].classList.add('s2Selected');
  document.querySelectorAll('.s2Info')[0].classList.add('disNone');
  document.querySelectorAll('.s2Info')[1].classList.remove('disNone');
});

document.querySelectorAll('.s2Options')[0].addEventListener('click', function () {
  document.querySelectorAll('.s2Options')[1].classList.remove('s2Selected');
  document.querySelectorAll('.s2Options')[0].classList.add('s2Selected');
});


document.querySelectorAll(".rbsOption")[1].addEventListener('click', function () {
  document.querySelectorAll(".rbsOption")[0].classList.remove("rbsSelected");
  document.querySelectorAll(".rbsOption")[2].classList.remove("rbsSelected");
  document.querySelectorAll(".rbsOption")[1].classList.add("rbsSelected");

  document.querySelector(".rbsInfo1").style.display = "none";
  document.querySelector(".rbsInfo2").style.display = "flex";
  document.querySelector(".rbsInfo3").style.display = "none";

  document.querySelector(".rbsRS").style.display = "flex";
  document.querySelector(".rbsSell").style.display = "none";

});

document.querySelectorAll(".rbsOption")[2].addEventListener('click', function () {
  document.querySelectorAll(".rbsOption")[0].classList.remove("rbsSelected");
  document.querySelectorAll(".rbsOption")[1].classList.remove("rbsSelected");
  document.querySelectorAll(".rbsOption")[2].classList.add("rbsSelected");

  document.querySelector(".rbsInfo1").style.display = "none";
  document.querySelector(".rbsInfo2").style.display = "none";
  document.querySelector(".rbsInfo3").style.display = "flex";

  document.querySelector(".rbsRS").style.display = "none";
  document.querySelector(".rbsSell").style.display = "flex";
});

document.querySelectorAll(".rbsOption")[0].addEventListener('click', function () {
  document.querySelectorAll(".rbsOption")[1].classList.remove("rbsSelected");
  document.querySelectorAll(".rbsOption")[2].classList.remove("rbsSelected");
  document.querySelectorAll(".rbsOption")[0].classList.add("rbsSelected");

  document.querySelector(".rbsInfo1").style.display = "flex";
  document.querySelector(".rbsInfo2").style.display = "none";
  document.querySelector(".rbsInfo3").style.display = "none";
  document.querySelector(".rbsRS").style.display = "flex";
  document.querySelector(".rbsSell").style.display = "none";

});



