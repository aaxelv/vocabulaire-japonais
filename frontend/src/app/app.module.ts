import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

import {MatToolbarModule, MatFormFieldModule,MatInputModule,MatOptionModule, MatSelectModule,MatIconModule,MatButtonModule,MatCardModule,MatTableModule,MatDividerModule,MatSnackBarModule} from '@angular/material';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListComponent } from './components/list/list.component';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';
import { SubscribeComponent } from './components/subscribe/subscribe.component';
import { LoginComponent } from './components/login/login.component';
import { SuperadminComponent } from './components/superadmin/superadmin.component';
import { ManageComponent } from './components/manage/manage.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { VocComponent } from './components/voc/voc.component';


import { IssueService } from './issue.service';


const routes: Routes = [
  {path: 'create', component: CreateComponent},
  {path: 'edit/:id', component: EditComponent},
  {path: 'list', component: ListComponent},
  {path : 'login', component: LoginComponent},
  {path : 'subscribe', component: SubscribeComponent},
  {path : 'superadmin', component : SuperadminComponent},
  {path : 'manage/:id', component : ManageComponent},
  {path : 'voc', component : VocComponent},
  {path : 'profile', component : ProfileComponent},
  {path: '', redirectTo:'list', pathMatch: 'full'}
];

@NgModule({
  declarations: [ 
    AppComponent,
    ListComponent,
    CreateComponent,
    EditComponent,
    SubscribeComponent,
    LoginComponent,
    SuperadminComponent,
    ManageComponent,
    HomeComponent,
    ProfileComponent,
    VocComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatDividerModule,
    MatSnackBarModule
  ],
  providers: [IssueService],
  bootstrap: [AppComponent]
})
export class AppModule { }
