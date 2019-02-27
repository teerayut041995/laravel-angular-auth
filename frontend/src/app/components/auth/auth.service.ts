import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { TokenService } from './../../Services/token.service';
import { AhthCheckService } from './../../Services/ahth-check.service';

import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private authStatusListener = new Subject<string>();
  private isAuthenticated = false;

  constructor(
    private http: HttpClient,
    private tokentService: TokenService,
    private router: Router,
    private authCheckService: AhthCheckService
  ) {}

  getIsAuth() {
    return this.isAuthenticated;
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  login(email: string , password: string) {
    const data = {email: email , password: password};
    this.http.post('http://127.0.0.1:8000/api/login' , data)
      .subscribe(response => {
        console.log(response);
        this.isAuthenticated = true;
        this.handleResponse(response);
        this.authStatusListener.next();
      } , error => {
        this.authStatusListener.next(error.error.error);
      });
  }
  signup(email: string , name: string , password: string , confirm_password: string) {
    console.log('start');
    const data = {email: email , name: name , password: password , password_confirmation: confirm_password};
    return this.http.post('http://127.0.0.1:8000/api/signup' , data);
  }
  handleResponse (data) {
    this.tokentService.handle(data.access_token);
    this.authCheckService.changeAuthStatus(true);
    this.router.navigate(['/profile']);
  }
  logout() {
    this.authCheckService.changeAuthStatus(false);
    this.router.navigate(['/auth/login']);
  }
  autoAuthUser() {
    const authInformation = this.tokentService.loggedIn();
    if (!authInformation) {
      return this.isAuthenticated = false;
    } else {
      return this.isAuthenticated = true;
    }
  }
  sendPasswordResetLink(email: string) {
    const data = {email: email};
    return this.http.post('http://127.0.0.1:8000/api/sendPasswordResetLink' , data);
  }
  changePassword(email: string, password: string, password_confirmation: string , token: string) {
    const data = {
      email: email,
      password: password,
      password_confirmation: password_confirmation,
      token: token
    };
    return this.http.post('http://127.0.0.1:8000/api/resetPassword' , data);

  }

}
