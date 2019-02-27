import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  private error = {};
  constructor(public authService: AuthService) { }

  ngOnInit() {

  }

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.signup(form.value.email , form.value.name , form.value.password , form.value.confirm_password)
      .subscribe(response => {
        this.authService.handleResponse(response);
      } , error => {
        this.error = error.error.errors;
      });
  }
}
