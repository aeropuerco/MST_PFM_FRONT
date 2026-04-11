import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthService } from "../../services/auth.service"
import { authStore } from "../../utils/authStore"
import { storage } from "../../utils/storage"


export const Login = () => {

    const navigate = useNavigate()

    // ESTADOS DEL FORMULARIO Y ESTADOS DE CARGA Y ERROR (UI)

    const [form, setForm] = useState({ name:'', password:''})
    const [loading,setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [ok, setOk] = useState(null)

    

    // Gestión de los input del formulario

    const onChange = (e) => {
      
        setForm ((prev)=>({...prev, [e.target.name]: e.target.value}))
    }

// funcion que envía el formulario
    const onSubmit = async (e) => {
      e.preventDefault() // evita la recarga despues del submit
      setError(null) //limpiamos mensajes de error y de ok
      setOk(null)

      setLoading(true) //empieza la llamada a la API

      try {
        //llamamos a la funcion login de la API
        const data = await AuthService.login({
          name: form.name.trim().toLowerCase(),
          password: form.password
        })

        // Comprobamos si hay token generado
        const token = data.token ?? data?.data?.token; //objetos anidados

        // Comprobar si en la data hay un usuario
        const user = data.user ?? data?.data?.user ?? data?.data;

        //
        if (!token) throw new Error('El backend no devolvió token')
        
        // Si hay token, lo guardo en el localStorage
        authStore.set(token)

        //ademas, guardo el user con su clave user en el localStorage
        storage.set('user', user ?? null)

        // una vez terminado el login, volvemos a la Home con el perfil correspondiente
        navigate('/home')


      } catch (error) {
        setError(err.message || 'Error al iniciar sesión')
      } finally {
        setLoading(false) // termina el proceso de llamada a la API
      }

    }

  return (
    <section className="card">
      <h2>INICIAR SESIÓN</h2>
      <form className="space-y" onSubmit={onSubmit}>

        <div className="field">
          <label>Nombre</label>
          <input name="name" value={form.name} onChange={onChange} />
        </div>

        <div className="field">
          <label>Contraseña</label>
          <input type="password" name="password" value={form.password} onChange={onChange} />
          
        </div>

        {error && <div className="error">{error}</div>}

        <div className="row" style={{justifyContent:'flex-end'}}>
          <button className="btn" disabled={loading}>{loading?'Iniciando sesión ...':'Iniciar sesión'}</button>
        </div>

      </form>
    </section>
  )
}
