import React, { useState } from "react";
import { isUserValid, welcomeGuest } from "@/lib/auth";
import loginImage from "@/assets/images/log-in-image.png";
import styles from "@/pages/login.module.css";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  function handleNameChange({ target }) {
    const regex = /^[A-Za-z0-9]*$/;
    if (regex.test(target.value)) setName(target.value);
  }

  function handlePasswordChange({ target }) {
    setPassword(target.value);
  }

  function checkInputs() {
    isUserValid({ name, password });
  }

  function joinAsGuess() {
    welcomeGuest();
  }

  return (
    <main className={styles.main}>
      <form onSubmit={(e) => e.preventDefault()}>
        <img src={loginImage.src} alt="log-in" />
        <h1>Log in to your pokemon account</h1>
        <section className={styles["user-data"]}>
          <label for={"username-input"}>
            Username
            <input
              value={name}
              onChange={handleNameChange}
              type={"text"}
              id={"username-input"}
              required
            />
          </label>

          <label for={"password-input"}>
            Password
            <input
              value={password}
              onChange={handlePasswordChange}
              type={"password"}
              id={"password-input"}
              required
            />
          </label>
        </section>
        <div className={styles.buttons}>
          <button type={"submit"} name={"input-text"} onClick={checkInputs}>
            Log in
          </button>
          <button type={"submit"} name={"input-text"} onClick={joinAsGuess}>
            Join as guest
          </button>
        </div>
      </form>
    </main>
  );
}
