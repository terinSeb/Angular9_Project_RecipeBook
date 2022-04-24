import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { user } from './user.modal';

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
  // user = new Subject<user>();
  private tokenExpirationTimer: any;
  user = new BehaviorSubject<user>(null);

  constructor(private http: HttpClient, private router: Router) {}
  // Below Code for Creating a New User
  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAUf4ts2SZjNAAHram6VJLVleVd8zsx7MA',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((respData) => {
          this.handleAuthentication(
            respData.email,
            respData.localId,
            respData.idToken,
            +respData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAUf4ts2SZjNAAHram6VJLVleVd8zsx7MA',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((respData) => {
          this.handleAuthentication(
            respData.email,
            respData.localId,
            respData.idToken,
            +respData.expiresIn
          );
        })
      );
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new user(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationTime =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      console.log(expirationTime);
      this.autoLogout(expirationTime);
    }
  }

  logOut() {
    this.user.next(null);
    this.router.navigate(['./auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }
  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logOut();
    }, expirationDuration);
  }
  private handleAuthentication(
    email: string,
    localId: string,
    idToken: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user_ = new user(email, localId, idToken, expirationDate);
    this.user.next(user_);
    localStorage.setItem('userData', JSON.stringify(user_));
  }
  private handleError(errorResp: HttpErrorResponse) {
    let errorMsg = 'An unknown error Occured';
    if (!errorResp.error || !errorResp.error.error) {
      return throwError(errorMsg);
    }
    switch (errorResp.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMsg = 'This Email already exists';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMsg =
          'There is no user record corresponding to this identifier. The user may have been deleted.';
        break;
      case 'INVALID_PASSWORD':
        errorMsg =
          'The password is invalid or the user does not have a password.';
        break;
      case 'USER_DISABLED':
        errorMsg = 'The user account has been disabled by an administrator.';
        break;
    }
    return throwError(errorMsg);
  }
}
