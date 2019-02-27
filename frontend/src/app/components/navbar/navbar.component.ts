import { AuthService } from './../auth/auth.service';
import { AhthCheckService } from './../../Services/ahth-check.service';
import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../Services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public loggedIn: boolean;

  constructor(private authCheckService: AhthCheckService,private authService: AuthService,private tokenService: TokenService) { }

  ngOnInit() {
    this.authCheckService.authStatus.subscribe(value => this.loggedIn = value);
  }
  onLogout() {
    this.tokenService.remove();
    this.authService.logout();
  }
}
