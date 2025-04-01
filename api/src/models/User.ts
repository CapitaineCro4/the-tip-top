export class User {
  id!: number;
  firstName!: string;
  lastName!: string;
  email!: string;
  gender!: string;
  isAdmin!: boolean;
  isEmploye!: boolean;
  birthDate!: Date;
  picture?: string;
  googleId?: string;
  facebookId?: string;
  createdAt!: Date;
  updatedAt!: Date;
}

export type CreateUser = {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  googleId?: string;
  facebookId?: string;
  picture?: string;
  gender: string;
  birthDate: Date;
  isAdmin: boolean;
  isEmploye: boolean;
};

export type UpdateUser = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  googleId?: string;
  facebookId?: string;
  picture?: string;
  gender?: string;
  birthDate?: Date | string;
  isAdmin?: boolean;
  isEmploye?: boolean;
};

export type WhereParams = {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  googleId?: string;
  facebookId?: string;
  isAdmin?: boolean;
  isEmploye?: boolean;
};
