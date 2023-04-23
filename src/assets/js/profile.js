function changeData(selectedOption) {
  if (selectedOption === 0) {
    addClass(0);
  } else if (selectedOption === 1) {
    addClass(1);
  } else if (selectedOption === 2) {
    addClass(2);
  } else if (selectedOption === 3) {
    addClass(3);
  } else if (selectedOption === 4) {
    addClass(4);
  }
}
const options = document.querySelectorAll('.link__item');

function addClass(option) {
  for (let i = 0; i < 5; i++) {
    if (option == i) {
      document.getElementById(`option${i + 1}Data`).classList.remove('display_none');
      options[i].classList.add('selected');
    } else {
      document.getElementById(`option${i + 1}Data`).classList.add('display_none');
      options[i].classList.remove('selected');
    }
  }
}
