export interface user {
  id?: number
  usuario: string
  primerNombre: string
  segundoNombre: string
  primerApellido: string
  segundoApellido: string
  idDepartamento: number
  idCargo: number
}

export interface apiResponse {
  users: user[]
}
