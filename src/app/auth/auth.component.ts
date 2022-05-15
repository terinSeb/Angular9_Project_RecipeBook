import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeHolder/placeholder.directive';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnDestroy {
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactResol: ComponentFactoryResolver
  ) {}

  private closeSub: Subscription;
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
      (errorMsg) => {
        this.error = errorMsg;
        this.showErrorAlert(errorMsg);
        console.log(errorMsg);
        this.isLoading = false;
      }
    );
    form.reset();
  }
  showErrorAlert(msg: string) {
    // const akertCompt = new AlertComponent();
    const alertCompanyFactory =
      this.componentFactResol.resolveComponentFactory(AlertComponent);
    const hostViewControllerRef = this.alertHost.viewContainerRef;
    hostViewControllerRef.clear();
    const componentRef =
      hostViewControllerRef.createComponent(alertCompanyFactory);
    componentRef.instance.message = msg;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewControllerRef.clear();
    });
  }
  onHandleError() {
    this.error = null;
  }
  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
}
