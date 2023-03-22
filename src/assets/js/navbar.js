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

var flag1 =0;
document.querySelectorAll('.navbarOptions')[0].addEventListener('click',function (){
  if(flag1 ==0 ){
    document.querySelector('.portfolioDropdownOption').style.display="flex";
  document.querySelector('.portfolioDropdownOption').style.flexDirection="column";
  flag1=1;
  }
  else{
    document.querySelector('.portfolioDropdownOption').style.display="none";
    flag1=0;
  }
  
});

var flag2 =0;
document.querySelectorAll('.navbarOptions')[1].addEventListener('click',function (){
  if(flag2 ==0 ){
    document.querySelector('.resourceDropdownOption').style.display="flex";
  document.querySelector('.resourceDropdownOption').style.flexDirection="column";
  flag2=1;
  }
  else{
    document.querySelector('.resourceDropdownOption').style.display="none";
    flag2=0;
  }
  
});



