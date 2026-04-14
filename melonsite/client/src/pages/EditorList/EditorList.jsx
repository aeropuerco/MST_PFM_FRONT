import { useEffect, useState, useCallback} from "react"
import { useAuth } from "../../contexts/AuthContext"
import { UserService } from "../../services/user.service"


export const EditorList = () => {

    const editorList = useCallback(async () => {
        
        const editors = await UserService.getEditors()
        
        return editors
    }, [])


  return (
    <>
        <h2>EDITORLIST //</h2>
        <div>Editor 1</div>
        <div>Editor 2</div>
        <div>Editor 3</div>

        <div>(ADMIN) Alta editor</div>
        <div>(ADMIN) Eliminar editor</div>
    </>
    
  )
}
