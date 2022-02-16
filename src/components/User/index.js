import clsx from "clsx";
import styles from "./User.module.scss";
import logo from "../../images/logo.jpg";

function User() {
  return (
    <div className={styles.user}>
      <div className={clsx(styles["user__logo"])}>
        <img src={logo} alt="logo" />
      </div>
      <div className={clsx(styles["user__info"])}>
        <div>App TodoList</div>
        <a href="#">Log Out </a>
      </div>
    </div>
  );
}
export default User;
