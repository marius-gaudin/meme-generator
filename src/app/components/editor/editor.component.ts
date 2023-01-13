import { Component, HostListener, NgZone, ViewChild } from '@angular/core';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import { faDownload, faChevronLeft, faMousePointer, faBold, faLeftLong, faRightLong, IconDefinition } from '@fortawesome/free-solid-svg-icons';
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

  selectTool = 'selectTool'
  addTextTool = 'addTextTool'
  tool = this.selectTool

  // Icons
  faDownload: IconDefinition = faDownload
  faMousePointer: IconDefinition = faMousePointer
  faBold: IconDefinition = faBold
  faLeft: IconDefinition = faLeftLong
  faRight:IconDefinition = faRightLong
  faChevronLeft: IconDefinition = faChevronLeft;

  constructor(private zone: NgZone, public apiService: ApiService, private route: ActivatedRoute, private router: Router){
    this.route.params.subscribe(params => {
      const id = params['id']
      if(id && typeof id === 'string'){
        this.apiService.getMemeById(id).subscribe({
          next: (meme: Meme) => {
            this.apiService.meme = meme
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

  setBold() {
    if(typeof this.apiService?.textSelected?.bold === 'boolean') {
      this.apiService.textSelected.bold = !this.apiService.textSelected.bold
    }
  }

  add() {
    if(this.apiService.textSelected?.size) {
      this.apiService.textSelected.size += 10
    }
  }

  addText(event: MouseEvent) {
    if(this.tool === this.addTextTool && this.apiService.meme) {
      this.tool = this.selectTool
      const top = this.container.nativeElement.getBoundingClientRect().y
      const left = this.container.nativeElement.getBoundingClientRect().x
      const newText: TextElement = {x: (event.x-left)/this.ratio, y: ((event.y-top)/this.ratio), color: 'black', size: 100, bold: false, _id: undefined, text: ''}
      this.apiService.textSelected = newText
      if(this.apiService.meme?.texts) {
        this.apiService.meme.texts.push(newText)
      } else if (this.apiService.meme) {
        this.apiService.meme.texts = [newText]
      }
    }
  }

  back() {
    if(this.apiService.meme) {
      this.apiService.saveTexts(this.apiService.meme.texts.filter(text => text.text)).subscribe(result => {
        this.router.navigate([''])
      })
    }
  }

  @HostListener('window:beforeunload')
  doSomething() {
    if(this.apiService.meme) {
      this.apiService.saveTexts(this.apiService.meme.texts.filter(text => text.text)).subscribe(result => {})
    }
  }

  download() {
    this.container.nativeElement.style.position = 'absolute'
    this.container.nativeElement.style.top = 0
    this.container.nativeElement.style.left = 0
    domtoimage.toBlob(this.container.nativeElement)
      .then((blob) => {
        saveAs(blob, this.apiService.meme?.name ? this.apiService.meme.name : 'meme')
        this.container.nativeElement.style.position = null
        this.container.nativeElement.style.top = null
        this.container.nativeElement.style.left = null
      });
  }
}