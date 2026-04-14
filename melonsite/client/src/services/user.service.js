import { http } from './http'

// Objeto con propiedades que dentro tienen funciones, son metodos.
// payload es la información que llega del usuario en el body

export const UserService = {
    getEditors : () => http('/api/users/editors', { method: 'GET'})
}

