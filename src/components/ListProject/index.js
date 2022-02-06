import clsx from 'clsx'
import styles from "./ListProject.module.scss";
import Project from "../Project";
import AddNewProject from "../AddNewProject";

function ListProject() {
  
    return (
        <div className="listProject"> 
            <AddNewProject/>
          
            <Project/>
           
            </div>
       
    )
}
export default ListProject;