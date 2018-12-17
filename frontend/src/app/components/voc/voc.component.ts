import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material';


import {Voc} from '../../voc.model';
import {IssueService} from '../../issue.service';
import {AccountService} from '../../account.service';

@Component({
  selector: 'app-voc',
  templateUrl: './voc.component.html',
  styleUrls: ['./voc.component.css','../../../../../bootstrap/css/bootstrap.min.css']
})
export class VocComponent implements OnInit {
	n = 30;
  createForm: FormGroup;

  voc : any = {}; 
  vocliste : Voc[] = [];
  constructor(private fb: FormBuilder, private accountService: AccountService, private snackBar: MatSnackBar, private issueService: IssueService, private router : Router) { 
  this.createForm = this.fb.group({
        traduction : ['',Validators.required]
    });
    }

  ngOnInit() {
  	this.fetchIssues();
  }

  fetchIssues() {
  	if (this.n>=5){
	  	this.issueService
	  		.getVocCheck()
	      .subscribe((data: any) => {if(data === "Not logged in") {
	      this.router.navigate(['/login']);
	      }
	      	else if(data in this.vocliste){
	      		this.fetchIssues();
	      	}
	  		else {
	  			this.voc = data;
	  			console.log('Data requested..');
	  		}
	  		this.n = this.n -1 })
  		}
  	else if (this.n>=2){
	  	this.issueService
	  		.getVocCheck()
	      .subscribe((data: any) => {if(data === "Not logged in") {
	      this.router.navigate(['/login']);
	      }
	  		else {
	  			this.voc = data;
	  			console.log('Data requested..');
	  		}
	  		this.n = this.n -1})
  	}
  	else if (this.n>=0){
	  	this.issueService
	  		.getVocCheck()
	      .subscribe((data: any) => {if(data === "Not logged in") {
	      this.router.navigate(['/login']);
	      }
	  		else {
	  			this.voc = data;
	  			console.log('Data requested..');
	  		}
	  		this.n = this.n -1 })
  	}
  	else {this.router.navigate(['/profile']);}
  }

  disconnect() {
    this.accountService.disconnect().subscribe(() =>this.router.navigate([`/login`]))
    }

  submitTraduction(traduction){
  	if (this.voc.french == traduction || this.voc.japanese == traduction) {
  		this.issueService.successTraduction(this.voc._id).subscribe(()=> {
  			this.snackBar.open('Correct','Ok',{duration:3000});
  			this.fetchIssues()
  			});
  	}
  	else {
  		this.issueService.failedTraduction(this.voc._id).subscribe(()=>{
  			this.snackBar.open('Incorrect, le mot est : ' + this.voc.french + ' / ' + this.voc.japanese + '\nVous aviez répondu : ' + traduction, 'Ok', {duration:10000});
  			this.fetchIssues()
  		});
  	}
  }

}
