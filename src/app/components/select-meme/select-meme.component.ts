import { Component } from '@angular/core';
import { ImgFlipMeme } from 'src/app/models/imgFlipMeme';
import { ImgflipService } from 'src/app/services/imgflip.service';
import { faChevronLeft, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-select-meme',
  templateUrl: './select-meme.component.html',
  styleUrls: ['./select-meme.component.scss']
})
export class SelectMemeComponent {
  search: string = ''
  memes: ImgFlipMeme[] | undefined
  selected: ImgFlipMeme | undefined
  faChevronLeft: IconDefinition = faChevronLeft;

  constructor(private imgFlipService: ImgflipService, private router: Router, private apiService: ApiService) {
    this.imgFlipService.getMemes().subscribe(result => {
      if(result.success) {
        this.memes = result.data.memes
      }
    })
  }

  back() {
    this.router.navigate([''])
  }

  setMeme(meme: ImgFlipMeme) {
    this.selected = meme
  }

  getMemes() {
    return this.search !== null && this.search !== '' ? this.memes?.filter(meme => meme.name.toLowerCase().search(this.search.toLowerCase()) !== -1) : this.memes
  }

  continue() {
    if(this.selected) {
      this.apiService.createMeme(this.selected.url).subscribe(newMeme => {
        console.log(newMeme)
        this.router.navigate(['editor', newMeme._id])
      })
    }
  }
}
