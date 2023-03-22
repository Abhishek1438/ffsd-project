document.querySelector('.mobileNav button').addEventListener('click', function () {
  document.querySelector('.navbar').classList.add('width-100');
  document.querySelector('.navbar').classList.add('height-100');
  document.querySelector('.navbar').classList.add('navbarOpen');
  document.querySelector('.closeBtnContainer').classList.remove('display-none');
});

document.querySelector('.closeButton').addEventListener('click', function () {
  document.querySelector('.navbar').classList.remove('width-100');
  document.querySelector('.navbar').classList.remove('height-100');
  document.querySelector('.navbar').classList.remove('navbarOpen');
  document.querySelector('.closeBtnContainer').classList.add('display-none');
});
