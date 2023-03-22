const loginBtn = document.querySelector('#login');

if (loginBtn != null) {
  loginBtn.addEventListener('click', (event) => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  });
}
const registerBtn = document.querySelector('#register');

console.log(registerBtn);

if (registerBtn != null) {
  registerBtn.addEventListener('click', (event) => {
    var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;

    const password = document.getElementById('password').value;

    if (
      !password.match(lowerCaseLetters) ||
      !password.match(upperCaseLetters) ||
      !password.match(numbers) ||
      password.length < 8
    ) {
      alert('Password should contain lower case, upper case, number and minimum of length 8');
    }

    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;

    fetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((response) => console.log(response));
  });
}
