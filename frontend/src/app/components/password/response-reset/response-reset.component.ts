import { AuthService } from './../../auth/auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import {SnotifyService} from 'ng-snotify';


@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.scss']
})
export class ResponseResetComponent implements OnInit {
  private error = {};
  public form = {
    email: null,
    password: null,
    password_confirmation: null,
    resetToken: null
  };

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private Notify: SnotifyService
    ) {
    route.queryParams.subscribe(params => {
      this.form.resetToken = params['token'];
    });
   }

  ngOnInit() {
  }

  onResetPassword(form: NgForm) {
    if(form.invalid) {
      return;
    }
    this.authService.changePassword(form.value.email,form.value.password,form.value.password_confirmation,this.form.resetToken)
      .subscribe(response => {
        this.handleResponse(response);
      } , error => {
        this.error = error.error.errors;
        // console.log(error);
      });
  }

  handleResponse(response) {
    this.router.navigate(['/auth/login']);
  }
}
