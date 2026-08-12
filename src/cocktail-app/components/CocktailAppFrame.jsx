import { Outlet } from "react-router"
import styles from "./CocktailAppFrame.module.css"
import { Navbar } from "./ui/Navbar"
import { Toaster } from "react-hot-toast"

export function CocktailAppFrame() {
  return (
    <div className={styles.appContainer}>
      <Navbar/>
      <main className={styles.main}>
        <Outlet/>
      </main>
      <Toaster/>
    </div>
  )
}
