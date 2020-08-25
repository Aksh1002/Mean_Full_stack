import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
	{path:'',component:HomeComponent},
	{path:'register',component:RegisterComponent},
	{path:'login',component:LoginComponent},
	{path:'dashboard',canActivate:[AuthGuard],component:DashboardComponent},
	{path:'profile',canActivate:[AuthGuard],component:ProfileComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
