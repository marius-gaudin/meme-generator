import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { JWTTokenService } from 'src/app/services/jwttoken.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  errors: string = '';
  email: string = '';
  password: string = '';

  constructor(private jwtService: JWTTokenService, private apiService: ApiService, private router: Router) {}

  canValide() {
    return !(this.email.length > 0 && this.password.length > 0);
  }

  valid() {
    this.apiService.login(this.email, this.password).subscribe(
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
