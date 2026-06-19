import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';

import { IAuthResponse, IRegisterUser, IUser, IUserCredentials } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly tokenStorageKey = 'mels-robot-shop-token';
  private readonly userStorageKey = 'mels-robot-shop-user';
  private user: BehaviorSubject<IUser | null>;

  constructor(private http: HttpClient) {
    this.user = new BehaviorSubject<IUser | null>(this.getStoredUser());
  }

  getUser(): Observable<IUser | null> {
    return this.user;
  }

  signIn(credentials: IUserCredentials): Observable<IUser> {
    return this.http
      .post<IAuthResponse>('/api/sign-in', credentials)
      .pipe(map((response: IAuthResponse) => {
        this.setSession(response);
        return response.user;
      }));
  }

  register(user: IRegisterUser): Observable<IUser> {
    return this.http
      .post<IAuthResponse>('/api/register', user)
      .pipe(map((response: IAuthResponse) => {
        this.setSession(response);
        return response.user;
      }));
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenStorageKey);
  }

  isSignedIn(): boolean {
    return !!this.user.getValue() && !!this.getToken();
  }

  signOut() {
    localStorage.removeItem(this.tokenStorageKey);
    localStorage.removeItem(this.userStorageKey);
    this.user.next(null);
  }

  private setSession(response: IAuthResponse) {
    localStorage.setItem(this.tokenStorageKey, response.token);
    localStorage.setItem(this.userStorageKey, JSON.stringify(response.user));
    this.user.next(response.user);
  }

  private getStoredUser(): IUser | null {
    const storedUser = localStorage.getItem(this.userStorageKey);
    if (!storedUser) {
      return null;
    }

    try {
      return JSON.parse(storedUser);
    } catch {
      localStorage.removeItem(this.userStorageKey);
      localStorage.removeItem(this.tokenStorageKey);
      return null;
    }
  }
}
