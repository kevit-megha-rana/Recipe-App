import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  error: string = null;
  
  constructor(private authSerive:AuthService) { }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){

    if(form.invalid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;

    if(this.isLoginMode){
      //..
    } else{
      this.authSerive.signUp(email,password).subscribe(
        response =>{
          console.log(response);
          this.isLoading = false;
        }, 
        error =>{
          console.log(error);
          this.error = 'An Error Occured!';
          this.isLoading = false;
        }
      );
      form.reset();
    } 
  }

  ngOnInit(): void {
  }

}
