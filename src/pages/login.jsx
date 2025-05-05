import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { users } from "@/lib/users";
import windowWidthProvider, {
  UserContext,
} from "@/contexts/WindowWidthProvider";
import loginImage from "@/assets/images/log-in-image.png";
import styles from "@/styles/pages/login.module.css";
import { useWindowWidth } from "@/contexts/WindowWidthProvider";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const windowWidth = useWindowWidth();

  const [showHeader, setShowHeader] = useState(true);

  const [loginError, setLoginError] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (windowWidth >= 480) {
      setShowHeader(true);
    } else {
      setShowHeader(false);
    }
  }, [windowWidth]);

  return (
    <div className={styles["form-wrapper"]}>
      <form onSubmit={(e) => e.preventDefault()}>
        <img src={loginImage.src} alt="log-in" />
        {showHeader && <h1>Log in to your pokemon account</h1>}

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
          <p>{loginError}</p>
        </section>

        <div className={styles.buttons}>
          <button
            type="submit"
            name="input-text"
            onClick={() => {
              if (!username) {
                setLoginError("No username inserted");
                return false;
              }

              if (!password) {
                setLoginError("No password inserted");
                return false;
              }

              const currentUser = users.find(
                ({ userName }) => userName === username
              );
              if (!currentUser) {
                setLoginError("Couldn't find username, try a different one");
                return false;
              }

              if (password !== currentUser.password) {
                setLoginError("Username and password do not match");
                return false;
              }

              setLoginError("");

              localStorage.setItem("username", currentUser.userName);
              router.push("/");
              return true;
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
