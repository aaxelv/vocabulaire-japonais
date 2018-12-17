// La page create sert à créer les notes de frais lié à l'user actuellement identifié

import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {Router} from '@angular/router'
import {IssueService} from '../../issue.service';
import {AccountService} from '../../account.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css', '../../../../../bootstrap/css/bootstrap.min.css']
})
export class CreateComponent implements OnInit {

	createForm: FormGroup;

  constructor(private accountService: AccountService, private issueService: IssueService,private fb: FormBuilder, private router: Router) {
  	this.createForm = this.fb.group({
  		title: ['', Validators.required],
  		date: '',
      ammount: '',
      devise:'',
  		description: ''
  	});
  }

  addVoc(french,japanese,lesson,memo1) {
  	this.issueService.addVoc(french,japanese,lesson,memo1).subscribe((data: String) => {
      if(data == 'Not logged in') {
        this.router.navigate(['/login'])
      }
      else{
  		this.router.navigate(['/superadmin']);
      }
  	})
  }

  disconnect() {
    this.accountService.disconnect().subscribe(() => this.router.navigate(['/login']))
  }


  ngOnInit() {
  }

}
