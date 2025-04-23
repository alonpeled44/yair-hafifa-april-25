const users = [
    {
        username: "noder",
        password: "8880",
    },
    {
        username: "neder",
        password: "8880",
    },
    {
        username: "adawddd",
        password: "8880",
    },
    {
        username: "adawd",
        password: "8880",
    },

];

const regex = /^[A-Za-z0-9]*$/;

const $usernameInput = document.querySelector("#username-input");
$usernameInput.addEventListener("keydown", event => {
  if (!regex.test(event.key)) {
    event.preventDefault();
  }
});

const $passwordInput = document.querySelector("#password-input");
$passwordInput.addEventListener("keydown", event => {
    if (!regex.test(event.key)) {
      event.preventDefault();
    }
});

function isUserValid(usernameElement, passwordElement) {
    const usernameInput = document.getElementById(usernameElement).value;
    const passwordInput = document.getElementById(passwordElement).value;

    if (!usernameInput) {
        alert('No username inserted!');
        return false;
    }

    if (!passwordInput) {
        alert('No password inserted!')
        return false;
    }

    const currentUser = users.find((({username}) => username === usernameInput));

    if (!currentUser) {
        alert('Couldn\'t find username, try a different one!');
        return false;
    }

    if (passwordInput !== currentUser.password) {
        alert('Username and password do not match!');
        return false;
    }

    alert(`Welcome back ${usernameInput}!`);
    return true;
}

function welcomeGuest() {
    alert("Welcome Mr.Mysterious!");
}

