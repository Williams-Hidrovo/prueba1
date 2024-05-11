import axios from 'axios'
import { user } from '../interfaces/userInterface'

export const createUser = async (user: user) => {
  try {
    const response = await axios.post('http://localhost:3001/api/users', user)
    console.log('usuario creado')
  } catch (err) {
    console.log(err)
  }
  // Llama a esta función con los datos del nuevo usuario
  // createUser({ name: 'John Doe', email: 'john@example.com' });
}

export const getUsers = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/users')
  } catch (error) {
    console.error('Error al obtener los usuarios')
  }
}

export const updateUser = async (userId: number, user1: user) => {
  try {
    const response = await axios.put(`http://localhost:3001/api/users/${userId}`, user1)
    console.log('Usuario actualizado:', response.data)
  } catch (error) {
    console.error('Error al actualizar el usuario:')
  }
}

export const getUsersFetch = async (): Promise<user[]> => {
  const url = 'http://localhost:3001/api/users'
  const resp = await fetch(url)
  const { users } = await resp.json()
  const data = users.map((user: user) => user)
  return data
}

export const deleteUser = async (userId: number) => {
  try {
    const response = await axios.delete(`http://localhost:3001/api/users/${userId}`)
    console.log('Usuario eliminado:', response.data)
  } catch (error) {
    console.error('Error al eliminar el usuario:')
  }
}

// Llama a esta función con el ID del usuario que deseas eliminar
// deleteUser(1);
