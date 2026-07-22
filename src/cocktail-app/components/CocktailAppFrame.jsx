import { Outlet } from "react-router"
import styles from "./CocktailAppFrame.module.css"
import { Navbar } from "./ui/NavBar"

export function CocktailAppFrame() {
  return (
    <div className={styles.appContainer}>
      <Navbar styles={styles}/>
      <main>
        <Outlet/>
      </main>
    </div>
  )
}