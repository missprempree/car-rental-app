import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

    // Hard code Login
    loginObj: any={
      user: "",
      password: ""
    }
    user: FormControl = new FormControl("");
    password: FormControl = new FormControl("");

    // API Login

    // apiUrl: string = "https://projectapi.gerasim.in/api/UserApp/login";
    apiUrl: string = "/userapi/";

    apiLoginObj: any={
      "EmailId": "",
      "Password": ""
    }
    router = inject(Router);
    http = inject(HttpClient);

    onLogin() {
      this.http.post(this.apiUrl + "login", this.apiLoginObj).subscribe((resultObj: any) => {
          debugger;
          if(resultObj.result) {
            localStorage.setItem("CAR_RENTAL_USERID", resultObj.data.userId);
            this.router.navigateByUrl("cars");
          } else{
            alert("Error: Unauthorized");
          }
      }, (error: HttpErrorResponse) => {
        console.error('Error:', error);
        alert(`Error: ${error.statusText}`);
      });
      /*
      if(this.user.value == "user_th" && this.password.value=="P@$$w0rd"){
         this.router.navigateByUrl("cars")
      }else{
        alert("wrong credentials")
      }
        */
    }
}
