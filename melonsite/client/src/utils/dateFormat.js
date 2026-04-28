// Pequeña utilidad para cambiar el formato de fecha


export const dateFormat = (date) => {

    if (!date) return "";

    let formattedDate = new Date(date).toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    })
    formattedDate = formattedDate.replace(',', '');
    
    return formattedDate;
}