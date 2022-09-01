import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  error: string = null;
  
  constructor(private authSerive:AuthService,
              private router:Router) { }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){

    if(form.invalid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if(this.isLoginMode){
      authObs = this.authSerive.login(email,password);
    } else{
      authObs = this.authSerive.signUp(email,password);
      form.reset();
    } 
    authObs.subscribe(
      response =>{
        console.log(response);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      }, 
      error =>{
        console.log(error);
        this.error = 'An Error Occured!';
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
  }

}
