import styles from "@/styles/login.module.css";
import loginImage from "@/assets/images/log-in-image.png";

export default function Login() {
  return (
    <main className={styles.main}>
      <form>
        <img src={loginImage.src} alt="log-in" />
        <h1>Log in to your pokemon account</h1>
        <section className={styles["user-data"]}>
          <label for={"username-input"}>
            Username
            <input type={"text"} id={"username-input"} required />
          </label>

          <label for={"password-input"}>
            Password
            <input type={"password"} id={"password-input"} required />
          </label>
        </section>
        <div className={styles.buttons}>
          <button
            type={"submit"}
            name={"input-text"}
            onclick={"isUserValid('username-input', 'password-input')"}
          >
            Log in
          </button>
          <button
            type={"submit"}
            name={"input-text"}
            onclick={"welcomeGuest()"}
          >
            Join as guest
          </button>
        </div>
      </form>
    </main>
  );
}
