import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { JWTTokenService } from 'src/app/services/jwttoken.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  errors: string = '';
  loginForm = this.formBuilder.group({
    email: '', 
    password: ''
  })

  constructor(private jwtService: JWTTokenService, private apiService: ApiService, private router: Router, private formBuilder: FormBuilder) {}

  canValide() {
    return !(this.loginForm.value.email && this.loginForm.value.email.length > 0 && 
            this.loginForm.value.password && this.loginForm.value.password.length > 0);
  }

  onSubmit() {
    const email = this.loginForm.value.email
    const password = this.loginForm.value.password
    if(email && password) {
      this.apiService.login(email, password).subscribe(
      {
        next: (result: any) => {
          this.errors = ''
          this.jwtService.setToken(result.token)
          this.router.navigate([''])
        },
        error: (error) => {
          if(error?.error?.message) {
            this.errors = error.error.message
          }
        }
      })
    }
  }
}
