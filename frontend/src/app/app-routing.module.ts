import { ResponseResetComponent } from './components/password/response-reset/response-reset.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AfterLogigGuard } from './components/auth/after-login.guard';
import { BeforeLogigGuard } from './components/auth/before-login.guard';
import { RequestResetComponent } from './components/password/request-reset/request-reset.component';



const routes: Routes = [
  {path: '' , component: ProfileComponent},
  {path: 'auth/login' , component: LoginComponent},
  {path: 'auth/signup' , component: SignupComponent},
  {path: 'profile' , component: ProfileComponent},
  {path: 'request-password-reset' , component: RequestResetComponent},
  {path: 'response-password-reset' , component: ResponseResetComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
