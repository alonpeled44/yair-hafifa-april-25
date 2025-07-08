import { useState } from "react";
import { useRouter } from "next/router";
import { useWindowWidth } from "../contexts/WindowWidthProvider";
import { users } from "../lib/users";
import loginImage from "../assets/images/login-image.png";
import styles from "../styles/pages/login.module.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const windowWidth = useWindowWidth();

  const [loginError, setLoginError] = useState("");

  const router = useRouter();

  return (
    <div className={styles["form-wrapper"]}>
      <form onSubmit={(e) => e.preventDefault()}>
        <img src={loginImage.src} alt="log-in" />
        {windowWidth >= 480 && <h1>Log in to your digimon account</h1>}

        <section className={styles["user-data"]}>
          <label htmlFor="username-input">
            Username
            <input
              value={username}
              onChange={(e) => {
                const regex = /^[A-Za-z0-9]*$/;
                if (regex.test(e.target.value)) setUsername(e.target.value);
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
          {loginError && <p>{loginError}</p>}
        </section>

        <div className={styles.buttons}>
          <button
            type="submit"
            name="input-text"
            onClick={() => {
              if (!username) {
                setLoginError("No username inserted");
                return;
              }

              if (!password) {
                setLoginError("No password inserted");
                return;
              }

              const currentUser = users.find(
                ({ userName }) => userName === username
              );
              if (!currentUser) {
                setLoginError("Couldn't find username, try a different one");
                return;
              }

              if (password !== currentUser.password) {
                setLoginError("Username and password do not match");
                return;
              }

              setLoginError("");

              localStorage.setItem("username", currentUser.userName);
              router.push("/");
            }}
          >
            Log in
          </button>
          <button
            type="submit"
            name="input-text"
            onClick={() => {
              setLoginError("");

              localStorage.setItem("username", "Guest");
              router.push("/");
            }}
          >
            Join as guest
          </button>
        </div>
      </form>
    </div>
  );
}
