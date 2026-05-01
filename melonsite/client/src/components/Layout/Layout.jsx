import { Outlet } from "react-router-dom"
import { Navbar } from "../Navbar/Navbar"
import Header from "../Header/Header"


export const Layout = () => {
  
    return(
      <div>
      < Header />
       < Navbar />
        <main>
          <div className='wrap'>
            <section className="page">
              
              <Outlet />

            </section>
          </div>
        </main>
        <footer></footer>
      </div>
    )
  }

