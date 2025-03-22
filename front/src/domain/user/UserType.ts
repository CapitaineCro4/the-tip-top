export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  birthDate: string;
  isAdmin: boolean;
  isEmploye: boolean;
  createdAt: string;
  updatedAt: string;

  fullName: () => string;
};

export type CreateUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
  birthDate: string;
};

export type UpdateUser = {
  firstName: string;
  lastName: string;
  email: string;
};
