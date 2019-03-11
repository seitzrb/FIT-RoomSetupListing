import { UserRole } from './user-role';
import { Role } from './role';

export class User {
  userId: number;
  nameIdentifier: string;
  fullName: string;
  emailAddress: string;
  givenName: string;
  familyName: string;
  isAppUser: boolean;
  Active: boolean;
  userRoles: UserRole[];
  roles: Role[];

  constructor() {
    this.roles = [];
  }
}
