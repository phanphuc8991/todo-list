import clsx from 'clsx'
import styles from "./Sidebar.module.scss";


function SideBar({children}) {
    return (
        <div className={styles.sideBar}>
            
          
            {children}
            </div>
    )
}
export default SideBar;