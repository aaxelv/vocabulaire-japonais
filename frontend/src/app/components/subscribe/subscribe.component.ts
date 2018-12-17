// La page admin sert à créer un compte pour soi ou en tant que superadmin-->

import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {AccountService} from '../../account.service';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';

import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {

	createForm: FormGroup;

  constructor(private accountService: AccountService, private snackBar: MatSnackBar, private fb: FormBuilder,  private router: Router) {
	this.createForm = this.fb.group({
		  	username: ['', Validators.required],
		  	password: ['', Validators.required]
  	});
   }

  subscribe(username,password) {
  	this.accountService.subscribe(username,password).subscribe((data) => {
    console.log(data)
      if (data === "signup") {
            this.router.navigate(['/superadmin']); 
        }
      else {
        this.snackBar.open  ("Nom d'utilisateur déjà utilisé", 'Ok', {
        duration : 3000
      })
      }
  	})
  }

  ngOnInit() {
  }

}
