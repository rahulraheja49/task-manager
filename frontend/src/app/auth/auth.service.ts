import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { tap } from 'rxjs/operators';

import { BackendConnectService } from '../_helpers/backend-connect.service';
import { User } from './user';
import { AuthResponse } from './auth-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authSubject = new BehaviorSubject(false);
  private _storage: Storage | null = null;

  constructor(
    private httpClient: HttpClient,
    private storage: Storage,
    private backend: BackendConnectService
  ) {
    this.init();
  }

  async init() {
    console.log('Accessing Storage');
    const storage = await this.storage.create();
    this._storage = storage;
    if (await this.storage.get('USER')) {
      this.authSubject.next(true);
    } else this.authSubject.next(false);
  }

  public async getHeaderOptions() {
    const token = await this.storage.get('ACCESS_TOKEN');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth-token': token,
      }),
    };
  }

  public async getUser() {
    return await this.storage.get('USER');
  }

  isLoggedIn() {
    return this.authSubject.asObservable();
  }

  private async setUserDetailsInStorage(res: AuthResponse) {
    await this._storage?.set('ACCESS_TOKEN', res.token);
    await this._storage?.set('EXPIRES_IN', res.jwtLifetime);
    await this._storage?.set('USER', res.user);
  }

  private async deleteUserDetailsInStorage() {
    await this.storage.remove('ACCESS_TOKEN');
    await this.storage.remove('EXPIRES_IN');
    await this.storage.remove('USER');
  }

  login(user: User): Observable<AuthResponse> {
    return this.httpClient
      .post(`${this.backend.getAddress()}/user/login`, user)
      .pipe(
        tap(async (res: AuthResponse) => {
          if (res.user) {
            await this.setUserDetailsInStorage(res);
            this.authSubject.next(true);
          }
        })
      );
  }

  register(user: User): Observable<AuthResponse> {
    return this.httpClient
      .post<AuthResponse>(`${this.backend.getAddress()}/user/register`, user)
      .pipe(
        tap(async (res: AuthResponse) => {
          if (res.user) {
            await this.setUserDetailsInStorage(res);
            this.authSubject.next(true);
          }
        })
      );
  }

  async logout() {
    console.log('Logging out');
    await this.deleteUserDetailsInStorage();
    this.authSubject.next(false);
    window.location.reload();
    return true;
  }

  isLoggedInNow() {
    return this.authSubject.getValue();
  }
}
