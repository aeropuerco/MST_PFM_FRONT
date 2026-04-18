import { useAuth } from "../../contexts/AuthContext"



export const UserItem = ({ name, id, action}) => {
    const { user } = useAuth();

    return (
        <div style={{display: 'flex'}}>
                <div className='editorList'>{name}</div>
                {user?.role === 'admin' && (
                        <button className="adminBtn" onClick={() => action(id)}>(ADMIN) Eliminar</button>
                    )}
                
        </div>
    )
}
