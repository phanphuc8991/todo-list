import { useState, useContext } from "react";
import clsx from "clsx";
import styles from "./User.module.scss";
import logo from "../../images/logo.jpg";
import { getAuth, signOut } from "firebase/auth";
import { TodoContext } from "../GlobalContext";
import { useListTodoFilter } from "../../hooks";
function User() {
  // CONTEXT

  // CONTEXT
  const { auth } = useContext(TodoContext);
  const authData = getAuth();
  function handleSignOut() {
    signOut(authData)
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
        <div>{auth.displayName}</div>
        <a href="#" onClick={handleSignOut}>
          Log Out{" "}
        </a>
      </div>
    </div>
  );
}
export default User;
