import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { LoggingService } from './logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private authservice: AuthService,
    private loggingService: LoggingService
  ) {}
  ngOnInit(): void {
    this.authservice.autoLogin();
    this.loggingService.printLog('This is a Sample Serive');
  }
  title = 'ShoppingProject';
}
