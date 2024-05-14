import axios from 'axios'
import { user } from '../interfaces/userInterface'

export const getCargos = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/users')
  } catch (error) {
    console.error('Error al obtener los usuarios')
  }
}

export const getCargosFetch = async (): Promise<user[]> => {
  const url = 'http://localhost:3001/api/users'
  const resp = await fetch(url)
  const { users } = await resp.json()
  const data = users.map((user: user) => user)
  return data
}
