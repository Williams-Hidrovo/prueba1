export interface user {
  id?: number
  usuario: string
  primerNombre: string
  segundoNombre: string
  primerApellido: string
  segundoApellido: string
  idDepartamento: number | string
  idCargo: number | string
}

export interface apiResponse {
  users: user[]
}

export interface ICargos {
  id: number
  codigo: string
  nombre: string
  activo: boolean
  idUsuarioCreacion: number
  idUsuarioCreacionNavigation?: null
}
export interface IDepartamentos {
  id: number
  codigo: string
  nombre: string
  activo: boolean
  idUsuarioCreacion: number
  idUsuarioCreacionNavigation?: null
}
