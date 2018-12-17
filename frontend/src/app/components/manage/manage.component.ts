// La page manage sert à gérer (ie modifier) les comptes, et est réservé au superadmin

import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import {AccountService} from '../../account.service';
import {Account} from '../../account.model';

import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css','../../../../../bootstrap/css/bootstrap.min.css']
})
export class ManageComponent implements OnInit { 

  id : String;
  account: any ={};
  updateForm: FormGroup;

  constructor(private accountService: AccountService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar, private fb: FormBuilder) {
  	this.createForm();	
   }

  createForm() {
	  this.updateForm = this.fb.group({
	  		username: ['', Validators.required],
	  		class: ['', Validators.required],
	  		connection: ['', Validators.required]
  })}


  ngOnInit() {
  	 this.route.params.subscribe(params => {
  		this.id = params.id;
  		this.accountService.getAccountById(this.id).subscribe( res => {
  			this.account = res;
  			this.updateForm.get('username').setValue(this.account.username);
  			this.updateForm.get('class').setValue(this.account.class);
  			this.updateForm.get('connection').setValue(this.account.connection);
  	});
  })
  } 

  updateAccount(username,clasS,connection) {
    this.accountService.updateAccount(this.id, username,clasS,connection).subscribe((data) => {
      if(data === 'Not logged in'){
        this.router.navigate(['/login'])
      }
      else{
      this.snackBar.open  ('Account updated successfully', 'Ok', {
        duration : 3000
      })
      }
    })
  }

  disconnect() {
    this.accountService.disconnect().subscribe(() =>this.router.navigate([`/login`]))
  }
}
