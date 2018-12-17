//La page login sert à s'identifier

import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../account.service';
import {Router} from '@angular/router'
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {NgZone} from '@angular/core';

import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  createForm: FormGroup;

  constructor(private accountService: AccountService, private snackBar: MatSnackBar,private fb: FormBuilder, private router: Router ) { 
  this.createForm = this.fb.group({
        username: ['', Validators.required],
        password: ''
    });
   }

  ngOnInit() {
  }

  connect(username,password) {
  	this.accountService.connect(username,password).subscribe((data: any ) =>{
      if (data === "success user") {
            this.router.navigate(['/list']); 
        }
      else if (data ==="success admin") {
        this.router.navigate(['/admin']);
      }
      else if (data ==="success superadmin") {
        this.router.navigate(['/superadmin']);
      }
      else {
        this.snackBar.open  ('Failed', 'Ok', {
        duration : 3000
      })
      }
        });

    }

}


  
