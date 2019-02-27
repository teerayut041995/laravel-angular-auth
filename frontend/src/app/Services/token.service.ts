import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private iss = {
    login: 'http://127.0.0.1:8000/api/login',
    signup: 'http://127.0.0.1:8000/api/signup'
  };
  constructor() { }

  handle(token) {
    this.set(token);
    // console.log(this.isValid());
  }
  set(token) {
    localStorage.setItem('token' , token);
  }
  get() {
    return localStorage.getItem('token');
  }
  remove() {
    localStorage.removeItem('token');
  }
  isValid() {
    const token = this.get();
    if(token) {
      const payload = this.payload(token);
      if(payload) {
        return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
      }
    }
    return false;
  }
  payload(token) {
    const payload =  token.split('.')[1];
    return this.decode(payload);
  }
  decode(payload) {
    return JSON.parse(atob(payload));
  }
  loggedIn() {
    return this.isValid();
  }
}
