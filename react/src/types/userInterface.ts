export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}
export interface User {
  userId: number;
  email: string;
  role: Role;
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
