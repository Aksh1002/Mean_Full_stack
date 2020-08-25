import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';


import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	name:string;
	username:string;
	email:string;
	password:string;
  dataRegister:any;
  constructor(private validateService:ValidateService ,
    
     private router: Router,
      private authService: AuthService,
    private flashMessage: FlashMessagesService) { }

  ngOnInit(): void {
  }

  onsubmit(){
  	const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

   // Required Fields
    if(!this.validateService.validateRegister(user)) {
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(user.email)) {
    this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    //register
    this.authService.registerUser(user).subscribe((data)=>{
      this.dataRegister = data;
    
      if(this.dataRegister.succes=="true"){
    this.flashMessage.show('Registered ,Please Login', {cssClass: 'alert-success', timeout: 3000});
    this.router.navigate(['/login']);
      }else{
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
    this.router.navigate(['/register']);
      }
    })

    
  }

}
