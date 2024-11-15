export enum Role {
  USER = "ROLE_USER",
  ADMIN = "ROLE_ADMIN",
}
export interface User {
  userId: number;
  email: string;
  roles: Array<Role>;
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
export type PartialUser = Partial<User>;
