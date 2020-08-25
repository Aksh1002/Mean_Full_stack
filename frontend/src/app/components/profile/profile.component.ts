import { Component, OnInit } from '@angular/core';
import {AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	resdata:any;
	user:any;
  constructor(private auth:AuthService,
  				private router:Router,
  				private flash:FlashMessagesService) { }

  ngOnInit(): void {
  	this.auth.getProfile().subscribe((profile)=>{
  		this.resdata=profile;
  		this.user=this.resdata.user;
  	},(err)=>{
  		console.log(err);
  		return false;
  	})
  	console.log("succesfull");
  }

}
