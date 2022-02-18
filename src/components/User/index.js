import clsx from "clsx";
import styles from "./User.module.scss";
import logo from "../../images/logo.jpg";
import { getAuth, signOut } from "firebase/auth";

function User() {
  const auth = getAuth();
  function handleSignOut() {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.log("error", error);
      });
  }
  return (
    <div className={styles.user}>
      <div className={clsx(styles["user__logo"])}>
        <img src={logo} alt="logo" />
      </div>
      <div className={clsx(styles["user__info"])}>
        <div>App TodoList</div>
        <a href="#" onClick={handleSignOut}>
          Log Out{" "}
        </a>
      </div>
    </div>
  );
}
export default User;
