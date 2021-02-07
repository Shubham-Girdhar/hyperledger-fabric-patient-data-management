/* Created By Faraz Shamim
Last Modification date : 31.01.2021
*/ 
import { SelectorListContext } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isLogin: boolean = false;
  isAdmin : boolean = false;
  errorMessage;
  roles = ["Doctor","Patient"];
  _url ;
  

  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _router:Router
  ) { }

  ngOnInit(): void {
    this.isUserLogin() ;
    this.isAdmin = this._auth.isUserAdmin();
  }

  onSubmit(form: NgForm) {
    
    console.log('Your form data : ', form.value, );
    this._url = form.value.role;
    this._api.postTypeRequest(`register${this._url}`, form.value).subscribe((res: any) => {
      if (res) {
        console.log(JSON.stringify(res));
        alert(JSON.stringify(res));
      window.location.reload();
      } 
      else {
        console.log(res);
        alert(res)}
    },
    
    err => {
      this.errorMessage = err['error'].message;
    });
  }
  isUserLogin(){
    if(this._auth.getToken() != null){
      this.isLogin = true;
    }
    else{
      this.isLogin = false;
    }
  }



    


    }
    // selectRole(form: NgForm ){
    //   const val  = form.value;
    //   if (val.role =="patient"){
    //     this._url = "registerPatient"
    //   } 
    //   else if (val.role =="doctor"){
    //     this._url = "registerDoctor"
    //   }
    
    // }
  
 

