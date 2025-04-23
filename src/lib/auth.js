const users = [
  {
    name: "noder",
    password: "8880",
  },
  {
    name: "neder",
    password: "8880",
  },
  {
    name: "adawddd",
    password: "8880",
  },
  {
    name: "adawd",
    password: "8880",
  },
];

const regex = /^[A-Za-z0-9]*$/;

export function isUserValid(props) {
  if (!props.name) {
    alert("No username inserted!");
    return false;
  }

  if (!props.password) {
    alert("No password inserted!");
    return false;
  }

  const currentUser = users.find(({ name }) => name === props.name);

  if (!currentUser) {
    alert("Couldn't find username, try a different one!");
    return false;
  }

  if (props.password !== currentUser.password) {
    alert("Username and password do not match!");
    return false;
  }

  alert(`Welcome back ${props.name}!`);
  return true;
}

export function welcomeGuest() {
  alert("Welcome Mr.Mysterious!");
}
