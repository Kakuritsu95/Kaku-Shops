import { Address } from "./orderInterface";

export enum Role {
  USER = "ROLE_USER",
  ADMIN = "ROLE_ADMIN",
}
export interface User {
  userId: number;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  address: Address;
  roles: Array<Role>;
}
export interface UserDetails {
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
}

export interface CreateUser extends LoginCredentials {
  firstName: string;
  lastName: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface UpdatePassword {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
