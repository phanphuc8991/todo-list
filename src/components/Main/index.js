import clsx from 'clsx'
import styles from "./Main.module.scss";

function Main({children}) {
    return (
        <div className={styles.main}>
         
            {children}
            </div>
    )
}
export default Main;