export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  birthDate: Date;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserWithoutPassword extends Omit<User, 'password'> {
  fullName: () => string;
}
