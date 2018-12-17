// La page list sert à afficher les notes de frais lié à l'user actuellement identifié

import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';


import {Issue} from '../../issue.model';
import {IssueService} from '../../issue.service';
import {AccountService} from '../../account.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css','../../../../../bootstrap/css/bootstrap.min.css']
})
export class ListComponent implements OnInit {

  createForm: FormGroup;

  issues: Issue[];
  displayedColumns = ['title', 'date','ammount','devise','description', 'status','justification', 'actions']
  constructor(private fb: FormBuilder, private accountService: AccountService, private issueService: IssueService, private router : Router) { 
  this.createForm = this.fb.group({
        title : ['',Validators.required]
    });
    }

  ngOnInit() {
  	this.fetchIssues();
  }

  fetchIssues() {
  	this.issueService
  		.getIssues()
      .subscribe((data: any) => {if(data === "Not logged in") {
      this.router.navigate(['/login']);
      }
  		else {
  			this.issues = data;
  			console.log('Data requested..');
  		} })
  }

  editIssue(id) {
  	this.router.navigate([`/edit/${id}`]);
  }

  deleteIssue(id) {
  	this.issueService.deleteIssue(id).subscribe( () => {
  		this.fetchIssues();
  	});
  }

  disconnect() {
    this.accountService.disconnect().subscribe(() =>this.router.navigate([`/login`]))
    }

  searchByTitle(title) {
    this.issueService.getIssuesByName(title).subscribe((data : Issue[]) => {this.issues = data})
  }

  initialize(){
    this.fetchIssues()
  }
  

}
