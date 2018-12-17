// On laisse ici toutes les procédures liés aux comptes, identification, création de //compte, suppression de compte, modification de compte, requete de compte -->

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
	uri = "http://localhost:4000";


  constructor(private http:HttpClient) { }

 
  connect(username,password) {
  	const account = {
  		username : username,
  		password : password,
  	};
  	return this.http.post(`${this.uri}/login`, account , {withCredentials:true});
  }



  subscribe(username,password) {
  	const account = {
  		username : username,
  		password : password,
  	};
  	return this.http.post(`${this.uri}/signup`, account, {withCredentials: true});
  }


  disconnect(){
  return this.http.get(`${this.uri}/signout`, {withCredentials: true})
  }

  getAccount() {
    return this.http.get(`${this.uri}/account`, {withCredentials: true});
  }

  getAccountById(id) {
    return this.http.get(`${this.uri}/account/${id}`, {withCredentials: true});
  }

  updateAccount(id,username,clasS,connection) {
    const account = {
      username : username,
      class: clasS,
      connection : connection.split(',')
    };
    return this.http.put(`${this.uri}/account/${id}`, account, {withCredentials: true});
  }


  deleteAccount(id) {
    return this.http.delete(`${this.uri}/account/${id}`, {withCredentials: true});
  }
}
