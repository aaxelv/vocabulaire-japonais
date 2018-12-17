// La page edit/:id sert à modifier la note de frais lié à l'user actuellement 

import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material';

import {IssueService} from '../../issue.service';
import {Issue } from '../../issue.model';
import {AccountService} from '../../account.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css','../../../../../bootstrap/css/bootstrap.min.css']
})
export class EditComponent implements OnInit {

  id : String;
  status : String;
  justification : String;
  issue: any ={};
  updateForm: FormGroup;
  constructor(private accountService: AccountService, private issueService: IssueService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar, private fb: FormBuilder) { 
 	this.createForm();
  }

  createForm() {
	  this.updateForm = this.fb.group({
	  		title: ['', Validators.required],
	  		date: '',
	  		ammount: '',
	  		devise: '',
	  		description:'',
        objection:''
  })}



  ngOnInit() {
  	 this.route.params.subscribe(params => {
  		this.id = params.id;
  		this.issueService.getIssuesById(this.id).subscribe( res => {
  			this.issue = res;
        this.status = this.issue.status;
        this.justification = this.issue.justification;
  			this.updateForm.get('title').setValue(this.issue.title);
  			this.updateForm.get('date').setValue(this.issue.date);
  			this.updateForm.get('ammount').setValue(this.issue.ammount);
  			this.updateForm.get('devise').setValue(this.issue.devise);
  			this.updateForm.get('description').setValue(this.issue.description);
        this.updateForm.get('objection').setValue(this.issue.objection);
  		});
  	});
  } 




  updateIssue(title,date,ammount,devise,description,objection) {
    this.issueService.updateIssue(this.id, title, date,ammount,devise, description, this.status, this.justification, objection).subscribe((data) => {
      if(data === 'Not logged in'){
        this.router.navigate(['/login'])
      }
      else{
      this.snackBar.open  ('Issue updated successfully', 'Ok', {
        duration : 3000
      })
      }
    })
  }

  disconnect() {
    this.accountService.disconnect().subscribe(() =>this.router.navigate([`/login`]))
  }

}