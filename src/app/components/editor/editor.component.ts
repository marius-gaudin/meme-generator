import { Component, NgZone, ViewChild } from '@angular/core';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import { faShare, faMousePointer, faBold, faLeftLong, faRightLong, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Meme } from 'src/app/models/meme';
import { TextElement } from 'src/app/models/textElement';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent {
  @ViewChild('container') container: any
  
  resizeObserver?: ResizeObserver
  initialWidth: number = 800
  ratio: number = 1

  colorTool = 'colorTool'
  fontSizeTool = 'fontSizeTool'
  selectTool = 'selectTool'
  addTextTool = 'addTextTool'
  tool = this.selectTool

  // Icons
  faShare: IconDefinition = faShare
  faMousePointer: IconDefinition = faMousePointer
  faBold: IconDefinition = faBold
  faLeft: IconDefinition = faLeftLong
  faRight:IconDefinition = faRightLong

  constructor(private zone: NgZone, public apiService: ApiService, private route: ActivatedRoute, private router: Router){
    this.route.params.subscribe(params => {
      const id = params['id']
      if(id && typeof id === 'string'){
        this.apiService.getMemeById(id).subscribe({
          next: (meme: Meme) => {
            this.apiService.meme = meme
            this.apiService.texts = meme.texts
          }, 
          error: () => {
            this.router.navigate([''])
          }
        })
      } else {
        this.router.navigate([''])
      }
    })
  }

  add() {
    if(this.apiService.textSelected?.size) {
      this.apiService.textSelected.size += 10
    }
  }

  ngAfterViewInit() {
    this.resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      this.zone.run(() => {
        // Quand la fenêtre est redimensionné on met à jour le ratio
        this.ratio = entries[0].contentRect.width/this.initialWidth;
      });
    })
    this.resizeObserver.observe(this.container.nativeElement);
  }

  ngOnDestroy() {
    this.resizeObserver?.disconnect();
  }

  setColor(color: string) {
    if(this.apiService?.textSelected?.color) {
      this.apiService.textSelected.color = color
    }
  }

  addText(event: MouseEvent) {
    if(this.tool === this.addTextTool && this.apiService.meme) {
      this.tool = this.selectTool
      const top = this.container.nativeElement.getBoundingClientRect().y
      const left = this.container.nativeElement.getBoundingClientRect().x
      this.apiService.addText((event.x-left)/this.ratio, ((event.y-top)/this.ratio), 'black', 100).subscribe(text => {
        this.apiService.textSelected = text
        if(this.apiService.meme?.texts) {
          this.apiService.meme.texts.push(text)
        } else if (this.apiService.meme) {
          this.apiService.meme.texts = [text]
        }
      })
    }
  }

  download() {
    domtoimage.toBlob(this.container.nativeElement)
      .then(function (blob) {
        saveAs(blob, 'Meme');
      });
  }
}