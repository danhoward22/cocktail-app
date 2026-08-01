import { Outlet } from "react-router"
import styles from "./CocktailAppFrame.module.css"
import { Navbar } from "./ui/Navbar"

export function CocktailAppFrame() {
  return (
    <div className={styles.appContainer}>
      <Navbar/>
      <main className={styles.main}>
        <Outlet/>
      </main>
    </div>
  )
}
