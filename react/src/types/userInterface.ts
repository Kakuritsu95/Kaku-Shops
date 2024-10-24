export interface User {
  firstName: string;
  lastName: string;
  email: string;
}

export interface CreateUser extends User {
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
