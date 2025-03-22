import { User } from './UserType';

class _UserGet implements User {
  readonly id: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly gender: string;
  readonly birthDate: string;
  readonly isAdmin: boolean;
  readonly isEmploye: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;

  constructor(user: User) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.gender = user.gender;
    this.birthDate = user.birthDate;
    this.isAdmin = user.isAdmin;
    this.isEmploye = user.isEmploye;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }

  fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

export class UserFactory {
  static createFromApi(user: User): _UserGet {
    return new _UserGet(user);
  }
}
