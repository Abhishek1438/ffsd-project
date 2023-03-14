document.querySelectorAll(".s2Options")[1].addEventListener('click',function () { 
    document.querySelectorAll(".s2Options")[0].classList.remove("s2Selected");
    document.querySelectorAll(".s2Options")[1].classList.add("s2Selected");
    document.querySelectorAll(".s2Info")[0].classList.add("disNone");
    document.querySelectorAll(".s2Info")[1].classList.remove("disNone");
 });

 document.querySelectorAll(".s2Options")[0].addEventListener('click',function () { 
    document.querySelectorAll(".s2Options")[1].classList.remove("s2Selected");
    document.querySelectorAll(".s2Options")[0].classList.add("s2Selected");
 });

 document.querySelectorAll(".rbsOption")[1].addEventListener('click',function () { 
    document.querySelectorAll(".rbsOption")[0].classList.remove("rbsSelected");
    document.querySelectorAll(".rbsOption")[2].classList.remove("rbsSelected");
    document.querySelectorAll(".rbsOption")[1].classList.add("rbsSelected");
    document.querySelector(".rbsInfo1").classList.add("disNone");
    document.querySelector(".rbsInfo3").classList.add("disNone");
    document.querySelector(".rbsInfo2").classList.remove("disNone");
 });

 document.querySelectorAll(".rbsOption")[2].addEventListener('click',function () { 
    document.querySelectorAll(".rbsOption")[0].classList.remove("rbsSelected");
    document.querySelectorAll(".rbsOption")[1].classList.remove("rbsSelected");
    document.querySelectorAll(".rbsOption")[2].classList.add("rbsSelected");
    document.querySelector(".rbsInfo1").classList.add("disNone");
    document.querySelector(".rbsInfo2").classList.add("disNone");
    document.querySelector(".rbsInfo3").classList.remove("disNone");
 });

 document.querySelectorAll(".rbsOption")[0].addEventListener('click',function () { 
    document.querySelectorAll(".rbsOption")[1].classList.remove("rbsSelected");
    document.querySelectorAll(".rbsOption")[2].classList.remove("rbsSelected");
    document.querySelectorAll(".rbsOption")[0].classList.add("rbsSelected");
    document.querySelector(".rbsInfo2").classList.add("disNone");
    document.querySelector(".rbsInfo3").classList.add("disNone");
    document.querySelector(".rbsInfo1").classList.remove("disNone");
 });
