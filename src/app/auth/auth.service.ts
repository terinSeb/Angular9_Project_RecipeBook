import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}
  // Below Code for Creating a New User
  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((errResp) => {
          let errorMsg = 'An unknown error Occured';
          if (!errResp.error || !errResp.error.error) {
            return throwError(errorMsg);
          }
          switch (errResp.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMsg = 'This Email already exists';
          }
          return throwError(errorMsg);
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((errResp) => {
          let errorMsg = 'An unknown error Occured';
          if (!errResp.error || !errResp.error.error) {
            return throwError(errorMsg);
          }
          switch (errResp.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMsg = 'This Email already exists';
          }
          return throwError(errorMsg);
        })
      );
  }
}
