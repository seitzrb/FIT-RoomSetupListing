import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Headers } from '@angular/http';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class UserService {
  private url = environment.serverName + environment.apiUrl + 'users';
  private userRolesUrl = environment.serverName + environment.apiUrl + 'userroles';
  private rolesUrl = environment.serverName + environment.apiUrl + 'roles';

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<User[]> {
    const url = `${this.url}`;
    return this.http.get<User[]>(url);
  }

  getUsersOrdered(): Observable<User[]> {
    const url = `${this.url}?orderby=fullName`;
    return this.http.get<User[]>(url)
      .pipe(
        map((res) => res),
        catchError(() => throwError('Error loading users'))
      );
  }

  getUser(id: number): Observable<User> {
    const url = `${this.url}/${id}`;
    return this.http.get<User>(url)
    .pipe(
      map((res) => res),
      catchError(() => throwError('Error loading user'))
    );
  }

  getLoggedInUser(): Observable<User> {
    const url = `${this.url}/userinfo`;
    return this.http.get<User>(url)
      .pipe(
        map((res) => res),
        catchError(() => throwError('Error loading users'))
      );
  }

  delete(user: User): Observable<{}> {
    const url = `${this.url}/${user.userId}`;
    return this.http.delete(url)
    .pipe(
      map((res) => res),
      catchError(() => throwError('Error deleting user'))
    );
  }

  create(user: User): Observable<User> {
    return this.http
      .post<User>(this.url, user)
      .pipe(
        map((res) => res),
        catchError(() => throwError('Error creating user'))
      );
  }

  update(user: User): Observable<User> {
    const url = `${this.url}/${user.userId}`;
    return this.http
      .put<User>(url, user)
      .pipe(
        map((res) => res),
        catchError(() => throwError('Error updating user'))
      );
  }
}
