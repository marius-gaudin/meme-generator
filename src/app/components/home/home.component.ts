import { Component } from '@angular/core';
import { Meme } from 'src/app/models/meme';
import { ApiService } from 'src/app/services/api.service';
import { faPlus, IconDefinition, faRightFromBracket, faTrash } from '@fortawesome/free-solid-svg-icons';
import { JWTTokenService } from 'src/app/services/jwttoken.service';
import { Router } from '@angular/router';
import { isDevMode } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  faRightFromBracket: IconDefinition = faRightFromBracket;
  faPlus: IconDefinition = faPlus;
  faTrash: IconDefinition = faTrash;
  memes: Meme[] = [];

  constructor(private apiService: ApiService, private jwtTokenService: JWTTokenService, private router:Router) {
    this.apiService.getMemes().subscribe((memes: Meme[]) => {
      this.memes = memes
    })
  }

  dev() {
    return isDevMode()
  }

  disconnect() {
    this.jwtTokenService.removeToken()
    this.router.navigate(['login'])
  }

  createMeme() {
    this.router.navigate(['select'])
  }

  remove(event: Event, id: string) {
    event.stopPropagation()
    if(confirm("Voulez vous vraiment supprimer ?")) {
      this.apiService.deleteMemeById(id).subscribe(()=>{
        this.memes.splice(this.memes.findIndex(meme => meme._id === id), 1)
      })
    }
  }

  update(id: string) {
    this.router.navigate(['editor', id])
  }

}
