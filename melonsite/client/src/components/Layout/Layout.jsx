import { Outlet } from "react-router-dom"
import { Navbar } from "../Navbar/Navbar"
import Header from "../Header/Header"


export const Layout = () => {
  
    return(
      <div>
      < Header />
       < Navbar />
        <main>
            <Outlet />
        </main>
        <footer></footer>
      </div>
    )
  }

