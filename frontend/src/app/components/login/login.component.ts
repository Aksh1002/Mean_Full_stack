import { Component, OnInit } from '@angular/core';
import {AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	username:string;
	password:string;
	resdata:any;
  constructor(private auth:AuthService,
  				private router:Router,
  				private flash:FlashMessagesService) { }

  ngOnInit(): void {
  }
  onlogin(){
  	const user={
  		username:this.username,
  		password:this.password
  	}

  	this.auth.authenticateUser(user).subscribe((data)=>{
  		
  		this.resdata=data;
  		// console.log(this.resdata.success);
  		if(this.resdata.success=='true'){
  			this.auth.storeUserData(this.resdata.token,this.resdata.user);
  			this.flash.show(this.resdata.msg,{
  				cssClass:'alert-success',
  				timeout:3000
  			});
        this.router.navigate(['profile']);
  		}else{
  			this.flash.show(this.resdata.msg,{
  				cssClass:'alert-danger',
  				timeout:3000
  			});
  			this.router.navigate(['login']);
  		}
  	})

  }
}
