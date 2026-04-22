import { useState } from "react"
import { AuthService } from "../../services/auth.service"
import { useAuth } from "../../contexts/AuthContext"

//SERVICIOS
import { PostService } from "../../services/post.service"
import { EditableContentBlock } from "../../components/EditableContentBlock/EditableContentBlock"


export const CreatePost = () => {
    // ESTADOS DEL FORMULARIO Y ESTADOS DE CARGA Y ERROR (UI)
    
    const { token , user } = useAuth()


    // definir useState con el estado vacío
    // este recopilará todo el post
  const [postData, setPostData] = useState({
      title: '',
      content_blocks: []

    })
    
    const [loading,setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [ok, setOk] = useState(null)

    

    // Para los cambios en el titulo (input siempre fijo, como estaba en el form register)

    const onChange = (e) => {
        const { name, value  } = e.target;
        setPostData ((prev) => ({...prev, [name]: value}) )

    }

    // Para los cambios en los bloques, con index variable
    const onBlockChange = (index, newValue) =>{
      setPostData ((prev) => {

          //Actualizamos con copia usando ...
          const newBlocks = [...prev.content_blocks]

          newBlocks[index] = {...newBlocks[index], valor: newValue}
          
          return {
            ...prev,
            content_blocks: newBlocks
          }

      })
    }

    // Añadir bloque

    const addBlock = (tipo) => {
        const newBlock = { tipo : tipo, valor:''}
        setPostData((prev) => ({
            ...prev,
            content_blocks: [...prev.content_blocks, newBlock]
        }))
        
        console.log("check postData: ", postData);
    }

    // Eliminar un bloque

    const removeBlock = (index) => {
        setPostData((prev) => ({
            ...prev,
            content_blocks: prev.content_blocks.filter((_,i) => i !== index)
        }))
    }

    // Validación de los campos del formulario antes de llamar a la API

    const validate = () => {
       /*  if(!form.name.trim()) return 'El nombre es obligatorio'
        if(!form.email.includes('@')) return 'Email no valido'
        if(!form.password || form.password.length < 6) return 'Contra al menos 6 digitos' */
        return null
    }


    // Envío del formulario - Coger los datos y llamar a la API

    const onSubmit = async (e) => {
        e.preventDefault() // evita la recarga despues del submit
        setError(null) //limpiamos mensajes de error y de ok
        setOk(null)

        const intValidate = validate()  //comprueba errores del formulario con la validacion
        if(intValidate) {setError(intValidate);return}  //si hay error lo setea, si no, no hace nada

        setLoading(true) //empieza la llamada a la API

        try {
            //cogemos el payload, lo que nos da el usuario
            const payload = {
                author: user.name,
                title: postData.title.trim(),  //para que no coja espacios
                content_blocks: postData.content_blocks.map((block) => ({
                      tipo: block.tipo,
                      valor: block.valor.trim()
                }))
            }

            // llamamos a la API

            const data = await PostService.create(payload, token)   /// LINEA DE EJECUCION
            console.log('Respuesta CREATE POST', data);
            setOk('POST PUBLICADO!')
            
        } catch (err) {
            console.log(err);
            setError(err.response?.data?.message || 'Error en el registro')
        } finally {
            setLoading(false) // termina el proceso de llamada a la API
        }
    }

    // Devolver el template de la página de register

    return (
        <section className="card">
            <h2>CREAR NUEVO POST /// {user.name}</h2>

            <form onSubmit={onSubmit}>
                <div className="title">
                    <input id="title" name="title" value={postData.title} onChange={onChange} placeholder="Escríbe un título" />
                </div>
                <div className="content_blocks" style={{display: 'flex', flexDirection:'column'}}>
                   
                   {postData.content_blocks.map((block, index) => (
                        <EditableContentBlock
                            key={index}
                            index={index}
                            block={block}
                            onChange={onBlockChange}
                            onRemove={removeBlock}
                        />
                    )

                   )}
                   

                </div>


                {error && <div role="alert">{error}</div>}
                {ok && <div>{ok}</div>}

            // BARRA CON TIPOS DE BLOQUES PARA AÑADIR
                <div className="toolbar">
                    <button type="button" onClick={()=> addBlock('parrafo')}>+ Parrafo</button>
                    <button type="button" onClick={()=> addBlock('subtitulo')}>+ Subtitulo</button>
                    <button type="button" onClick={()=> addBlock('imagen')}>+ Imagen</button>
                    <button type="button" onClick={()=> addBlock('code')}>+ Codigo</button>

                    <button type="submit" disabled={loading}>{loading ? 'Creando...' : 'PUBLICAR'}</button>
                </div>


            </form>
        </section>
    )
}
