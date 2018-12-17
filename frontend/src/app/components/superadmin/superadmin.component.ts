// La page superadmin sert à afficher les comptes déja existant

import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material';

import {Account} from '../../account.model';
import {AccountService} from '../../account.service';


@Component({
  selector: 'app-superadmin',
  templateUrl: './superadmin.component.html',
  styleUrls: ['./superadmin.component.css', '../../../../../bootstrap/css/bootstrap.min.css']
})
export class SuperadminComponent implements OnInit {


  account: Account[];
  displayedColumns = ['username', 'class','connection', 'actions']

  constructor(private accountService: AccountService, private router : Router) { }

  ngOnInit() {
  	this.fetchIssues();
  }

  fetchIssues() {
  	this.accountService
  		.getAccount()
      .subscribe((data: any) => {if(data === "Not logged in") {
      this.router.navigate(['/login']);
      }
  		else {
  			this.account = data;
  			console.log('Data requested..');
  		} })
  }

  editAccount(id) {
  	this.router.navigate([`/manage/${id}`]);
  }

  deleteAccount(id) {
  	this.accountService.deleteAccount(id).subscribe( () => {
  		this.fetchIssues();
  	});
  }

  disconnect() {
    this.accountService.disconnect().subscribe(() =>this.router.navigate([`/login`]))
    }

}
