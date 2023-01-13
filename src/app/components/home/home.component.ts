import { Component } from '@angular/core';
import { Meme } from 'src/app/models/meme';
import { ApiService } from 'src/app/services/api.service';
import { faCog, faPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { JWTTokenService } from 'src/app/services/jwttoken.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  faCog: IconDefinition = faCog;
  faPlus: IconDefinition = faPlus;
  memes: Meme[] = [];
  openOptions: boolean = false;

  constructor(private apiService: ApiService, private jwtTokenService: JWTTokenService, private router:Router) {
    this.apiService.getMemes().subscribe((memes: Meme[]) => {
      this.memes = memes
    })
  }

  disconnect() {
    this.jwtTokenService.removeToken()
    this.router.navigate(['login'])
  }

  createMeme() {
    this.router.navigate(['select'])
  }

}
