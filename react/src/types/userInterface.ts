export interface CreateUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UpdateUser {
  firstName?: string;
  lastName?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
