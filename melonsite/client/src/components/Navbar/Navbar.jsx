import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import style from './Navbar.module.css';
import { useState } from "react";

export const Navbar = () => {

    const {token, logout, user } = useAuth();

    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    }

    const closeMenu = () => {
      setIsOpen(false)
    }

  return (
    <nav className={style.nav}>

    <div className={`${style.links_container} ${isOpen ? style.open : ''}`} onClick={closeMenu} >
        <NavLink className={style.link} to='/'>Inicio</NavLink>
        <NavLink className={style.link} to='/editorlist'>Editores</NavLink>
        { !token ?  
        <>
            <NavLink className={style.link} to='/login'>Login</NavLink> 
            <NavLink className={style.link} to='/register'>Registro</NavLink>
            
        </>
        : 
          <>
            {user?.role === "editor" && (
                <NavLink className={style.link} to='/createpost'>CreatePost</NavLink>
            )}
            

            <button className={style.link} onClick={logout}>Logout</button>
  
          </>
        }
       


    </div>
    <div className={style.user_card}><strong>{user?.name}</strong>///{user?.role}</div>
    <div className={style.burger} onClick={toggleMenu}>+</div>


  </nav>
  )
}
