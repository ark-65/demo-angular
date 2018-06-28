import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login-and-register/login/login.component';
import { RegisterComponent } from './login-and-register/register/register.component';
import { BackgroundComponent } from './login-and-register/background/background.component';
import { HomeComponent } from './home/home.component';

const routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'background', component: BackgroundComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
