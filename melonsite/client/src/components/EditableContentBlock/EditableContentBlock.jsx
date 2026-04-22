
export const EditableContentBlock = ({ block, index, onChange, onRemove}) => {
    console.log("HOLA");

    const blockBody = () => {

        switch(block.tipo){

        case 'parrafo':
            return (
                <textarea 
                    value={block.valor} 
                    placeholder="Escribe un parrafo" 
                    onChange={(e) => onChange(index, e.target.value)} />
             )
       

        case 'imagen':
            return (
                <input type="text"
                    value={block.valor} 
                    placeholder="URL de la imagen,,,"
                    onChange={(e) => onChange(index, e.target.value)}/>
             )

        case 'subtitulo':
            return (
                <input type="text"
                value={block.valor} 
                placeholder="Añade un Subtitulo"
                onChange={(e) => onChange(index, e.target.value)}/>
            )

        case 'code':
            return (
                <textarea
                className="code" 
                value={block.valor} 
                placeholder="Escribe un fragmento de código" 
                onChange={(e) => onChange(index, e.target.value)} />
           )
        


        default:
            return (
                <textarea 
                value={block.valor} 
                placeholder="Escribe un texto" 
                onChange={(e) => onChange(index, e.target.value)} />
            )

        
        }
    
    }

    return (

        <div className="block">
            <div className="block-header">
                <span>Bloque: <strong>{block.tipo}</strong></span>
                <button type="button" onClick={() => onRemove(index)}>Eliminar</button>
            </div>
            <div className="block-body">
                {blockBody()}
            </div>
        </div>
    )

}