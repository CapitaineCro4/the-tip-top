export class User {
  id!: number;
  firstName!: string;
  lastName!: string;
  email!: string;
  gender!: string;
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
};

export type UpdateUser = {
  lastName?: string;
  email?: string;
  password?: string;
  gender?: string;
};

export type WhereParams = {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
};
