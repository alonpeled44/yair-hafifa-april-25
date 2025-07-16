import { useState } from "react";
import { useRouter } from "next/router";
import { useWindowWidth } from "../contexts/WindowWidthProvider";
import { Theme, FontSize } from "../lib/enums";
import useUser from "../hooks/useUser";
import loginImage from "../assets/images/login-image.png";
import styles from "../styles/pages/login.module.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [theme, setTheme] = useState(Theme.LIGHT);
  const [fontSize, setfontSize] = useState(FontSize.MEDIUM);
  const { getUser } = useUser();

  const [loginError, setLoginError] = useState("");

  const windowWidth = useWindowWidth();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const user = await getUser(username, password);

      if (user) {
        localStorage.setItem("username", user.username);
        localStorage.setItem("password", user.password);
        localStorage.setItem("theme", user.theme);
        localStorage.setItem("font", user.fontSize);

        setLoginError("");
        router.push("/");
      } else {
        setLoginError("Invalid username or password");
      }
    } catch (err) {
      setLoginError("Something went wrong. Try again later.");
      console.error("Login error:", err);
    }
  };

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
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password-input"
              required
            />
          </label>
          {loginError && <p>{loginError}</p>}
        </section>

        <div className={styles.buttons}>
          <button type="submit" onClick={handleLogin}>
            Log in
          </button>
          <button
            type="submit"
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
