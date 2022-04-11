import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  constructor(private authService: AuthService, private router: Router) {}
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    this.error = null;
    let AuthObs: Observable<AuthResponseData>;
    if (!this.isLoginMode) {
      const email = form.value.email;
      const password = form.value.password;
      AuthObs = this.authService.login(email, password);
    } else {
      const email = form.value.email;
      const password = form.value.password;
      AuthObs = this.authService.signUp(email, password);
    }

    AuthObs.subscribe(
      (response) => {
        console.log(response);
        this.isLoading = false;
        this.router.navigate(['./recipes']);
      },
      (error) => {
        this.error = error;
        console.log(error);
        this.isLoading = false;
      }
    );
    form.reset();
  }
}
