export class User {
  id!: number;
  firstName!: string;
  lastName!: string;
  email!: string;
  gender!: string;
  isAdmin!: boolean;
  birthDate!: Date;
  createdAt!: Date;
  updatedAt!: Date;
}

export type CreateUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
  birthDate: Date;
  isAdmin: boolean;
};

export type UpdateUser = {
  lastName?: string;
  email?: string;
  password?: string;
  gender?: string;
  isAdmin?: boolean;
};

export type WhereParams = {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  isAdmin?: boolean;
};
