import { useState } from "react";
import { users } from "@/lib/users";
import loginImage from "@/assets/images/log-in-image.png";
import styles from "@/pages/login.module.css";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={styles["form-wrapper"]}>
      <form onSubmit={(e) => e.preventDefault()}>
        <img src={loginImage.src} alt="log-in" />
        <h1>Log in to your pokemon account</h1>
        <section className={styles["user-data"]}>
          <label htmlFor={"username-input"}>
            Username
            <input
              value={name}
              onChange={(e) => {
                const regex = /^[A-Za-z0-9]*$/;
                if (regex.test(e.target.value)) setName(e.target.value);
              }}
              type="text"
              id="username-input"
              required
            />
          </label>

          <label htmlFor="password-input">
            Password
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              id="password-input"
              required
            />
          </label>
        </section>
        <div className={styles.buttons}>
          <button
            type="submit"
            name="input-text"
            onClick={() => {
              if (!name) {
                alert("No username inserted!");
                return false;
              }

              if (!password) {
                alert("No password inserted!");
                return false;
              }

              const currentUser = users.find(
                ({ username }) => username === name
              );
              if (!currentUser) {
                alert("Couldn't find username, try a different one!");
                return false;
              }

              if (password !== currentUser.password) {
                alert("Username and password do not match!");
                return false;
              }

              alert(`Welcome back ${name}!`);
              return true;
            }}
          >
            Log in
          </button>
          <button
            type="submit"
            name="input-text"
            onClick={() => {
              alert("Welcome Mr.Mysterious!");
            }}
          >
            Join as guest
          </button>
        </div>
      </form>
    </div>
  );
}
