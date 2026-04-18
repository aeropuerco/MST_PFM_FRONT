import { http } from './http'

// Objeto con propiedades que dentro tienen funciones, son metodos.
// payload es la información que llega del usuario en el body

export const UserService = {
    getEditors : () => http('/api/users/editors', { method: 'GET'}),
    deleteEditor : (id, token) => http(`/api/users/${id}`, { method: 'DELETE', token}),
    registerEditor : (payload, token) => http(`/api/users/createeditor`, {method:'POST', body:payload, token})
}

