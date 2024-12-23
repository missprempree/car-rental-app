import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


    user: FormControl = new FormControl("");
    password: FormControl = new FormControl("");

    router = inject(Router);
    onLogin() {
      if(this.user.value == "admin" && this.password.value=="123456"){
         this.router.navigateByUrl("dashboard")
      }else{
        alert("wrong credentials")
      }
    }
}
