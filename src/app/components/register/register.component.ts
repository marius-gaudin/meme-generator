import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { JWTTokenService } from 'src/app/services/jwttoken.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  errors: string = '';
  registerForm = this.formBuilder.group({
    email: '', 
    password: '',
    confirmPassword: ''
  })

  constructor(private jwtService: JWTTokenService, private apiService: ApiService, private router: Router, private formBuilder: FormBuilder) {}

  canValide() {
    return !(this.registerForm.value.email && this.registerForm.value.email.length > 0 && 
            this.registerForm.value.password && this.registerForm.value.password.length > 0 &&
            this.registerForm.value.confirmPassword && this.registerForm.value.confirmPassword.length > 0);
  }

  onSubmit() {
    const email = this.registerForm.value.email
    const password = this.registerForm.value.password
    const confirmPassword = this.registerForm.value.confirmPassword
    if(email && password && confirmPassword) {
      this.apiService.register(email, password, confirmPassword).subscribe(
      {
        next: (result: any) => {
          this.errors = ''
          this.router.navigate(['login'])
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
