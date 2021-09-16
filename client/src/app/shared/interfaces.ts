export interface User {
  email: string
  password: string
}

export interface Users {
  id?: number
  role_id: number
  role_name?: string
  status: number
  email: string
  pasword?: string
  fio: string
  created?: string
  updated?: string
  data: Users
}

export interface Role {
  id?: number
  parent_id?: number
  name?: string
  status?: number
  created?: string
  updated?: string
  data: Role
}


