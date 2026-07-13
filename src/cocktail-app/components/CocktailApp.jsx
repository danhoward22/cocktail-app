import { Outlet } from "react-router"
import styles from "./CocktailApp.module.css"
import { Navbar } from "./NavBar"

export function CocktailApp() {
  return (
    <div className={styles.appContainer}>
      <Navbar styles={styles}/>
      <main>
        <Outlet/>
      </main>
    </div>
  )
}