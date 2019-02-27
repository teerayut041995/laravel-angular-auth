import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.scss']
})
export class RequestResetComponent implements OnInit {
  error = null;
  public form = {
    email: null
  };
  constructor(private authService: AuthService , private notify: SnotifyService) { }

  ngOnInit() {
  }

  onRequetReset(form: NgForm) {
    if(form.invalid) {
      return;
    }
    this.authService.sendPasswordResetLink(form.value.email)
      .subscribe(response => {
        console.log(response);
        this.handleResponse(response);
      } , error => {
        console.log(error);
        this.notify.error(error.error.error);
      });
  }

  handleResponse(res) {
    this.form.email = null;
  }
}
