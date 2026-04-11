import { useEffect, useState } from "react"

import { AuthService } from "../../services/auth.service"
import { authStore } from "../../utils/authStore"




export const CreatePost = () => {

  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
      const token = authStore.get()  //cojo el token se guardó en el localStorage

      if(!token){  // si no hay token, lanzo error
        setError('No hay token de autenticación');
        return;
      }
      // llamo a la API a la ruta /profile
      AuthService.profile(token)
      .then(setUser)
      .catch(err => setError(err.message))

  },[])


  return (
    <section className="card">
      <h2>REDACTAR POST</h2>
      {error && <div className="error">{error}</div>}
      {!error && !user && <p className="muted">Cargando...</p>}

      {user && (
        <ul>
          {Object.entries(user)
          .filter(([k]) => k !== 'password')
          .map(([k,v]) => <li key={k}><strong>{k}:</strong> {String(v)}</li>)}
        </ul>
      )}


    </section>
  )
}
