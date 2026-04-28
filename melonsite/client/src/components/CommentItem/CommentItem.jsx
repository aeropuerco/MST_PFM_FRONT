import { useAuth } from "../../contexts/AuthContext"
import commentitemStyle from './CommentItem.module.css'


export const CommentItem = ({ content, id, action, postAuthorId, commentAuthorName, commentAuthorId}) => {
    const { user } = useAuth();

    
    const isOwnerOfComment = user?.id === commentAuthorId;
    const isOwnerOfPost = user?.id === postAuthorId;
    const isAdmin = user?.role === 'admin'

    return (
        <div className={commentitemStyle.item}>
                <div className={commentitemStyle.author}>{commentAuthorName}:</div>
                <div className={commentitemStyle.text}>{content}</div>
                {(isOwnerOfComment || isOwnerOfPost || isAdmin) && (
                        <button className="adminBtn" onClick={() => action(id)}>Eliminar comentario</button>
                    )}
                
        </div>
    )
}
