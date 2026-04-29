//CSS
import postStyle from './ContentBlock.module.css'


export const ContentBlock = ({ tipo, children}) => {


        switch(tipo){

        case 'parrafo':
            return (
                <p className={postStyle.parrafo}>
                    {children}
                </p>
             )
       

        case 'imagen':
            return (
                <div className={postStyle.imagen} background-image={children}></div>
             )

        case 'subtitulo':
            return (
                 <h2 className={postStyle.subtitulo}>{children}</h2>
            )

        case 'code':
            return (
                <div className={postStyle.code}>{children}</div>
           )
        


        default:
            return (
                <div>
                    {children}
                </div>
            )

        

    
}

}