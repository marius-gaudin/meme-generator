import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { faUpRightAndDownLeftFromCenter, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { TextElement } from 'src/app/models/textElement';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent {
  @ViewChild('textArea') textArea: any; 
  @Input() ratio: number = 1;
  
  @Input() text: TextElement | null = null;

  // Dimension de la zone de texte
  width: number = 400;
  height: number = 0;

  // True quand le texte est sélectionné
  active: boolean = false;

  // True Lorsque le texte est en train d'être redimensionné
  onRezise: boolean = false;

  // Position de la souris lors de la redimension ou drag and drop
  mouseX: number = 0;
  mouseY: number = 0;

  // ICONS
  faUpRightAndDownLeftFromCenter: IconDefinition = faUpRightAndDownLeftFromCenter;

  constructor(private apiService: ApiService) {}

  ngAfterViewInit() {
    Promise.resolve().then(() => {
      this.setHeight()
      if(this.text === this.apiService.textSelected) {
        this.textArea.nativeElement.focus()
      }
    });
  }

  setHeight() {
    this.height = this.textArea.nativeElement.scrollHeight - 20;
  }

  focus(state: boolean, event: any) {
    if(state) {
      this.active = state;
      this.apiService.textSelected = this.text
    } else {
      if(event?.relatedTarget?.nodeName === 'INPUT') {
        this.textArea.nativeElement.focus()
        return
      }
      this.active = state;
      if(this.apiService.textSelected === this.text) {
        this.apiService.textSelected = null
      }
      if(this.text?.text === '' && typeof this.text?._id === 'string') {
        this.apiService.deleteText(this.text?._id).subscribe(()=> {
          this.apiService.texts.splice(this.apiService.texts.findIndex(text => text._id === this.text?._id), 1)
        })
      }
    }
  }

  dragStart(event: any) {
    if(this.onRezise) return;
    let gapX: number;
    let gapY: number;

    const drag = (x: number, y: number) => {
      if(this.text) {
        this.text.x = (x/this.ratio) + gapX;
        this.text.y = (y/this.ratio) + gapY;
      }
    }

    switch(event.type) {

      // On Desktop
      case("mousedown"): {
        if(this.text) {
          gapX = this.text.x - (event.clientX/this.ratio);
          gapY = this.text.y - (event.clientY/this.ratio);
        }

        // On Drop
        document.onmouseup = (e) => {
          document.onmousemove = null;
        }

        // On Drag
        document.onmousemove = (e) => {
          drag(e.clientX, e.clientY);
        }
        break;
      }

      // On Mobile
      case("touchstart"): {
        if(event.changedTouches.length == 1) {
          
          if(this.text) {
            gapX = this.text.x - (event.changedTouches[0].clientX/this.ratio);
            gapY = this.text.y - (event.changedTouches[0].clientY/this.ratio);
          }
          // On Drop
          document.ontouchend = (e) => {
            document.ontouchmove = null;
          }

          // On Drag
          document.ontouchmove = (e) => {
            drag(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
          }
          break;
        }
      }
    }
  }

  resize(event: any) {
    if (!this.active) return;
    this.onRezise = true;
    event.preventDefault();

    const size = (x: number, y: number) => {
      this.width += (x - this.mouseX)*(1/this.ratio);
      this.mouseX = x;
      this.height += (y - this.mouseY)*(1/this.ratio);
      this.mouseY = y;
    }

    switch(event.type) {
      // On Desktop
      case("mousedown"): {
        // init
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
  
        document.onmouseup = (e) => {
          document.onmouseup = null;
          document.onmousemove = null;
          this.onRezise = false;
        }
  
        document.onmousemove = (e) => { 
          size(e.clientX, e.clientY) 
        }
        break;
      }

      // On Mobile
      case("touchstart"): {
        if(event.changedTouches.length == 1) {
          // init
          this.mouseX = event.changedTouches[0].clientX;
          this.mouseY = event.changedTouches[0].clientY;
    
          document.ontouchend = (e) => {
            document.ontouchend = null;
            document.ontouchmove = null;
            this.onRezise = false;
          }
  
          document.ontouchmove = (e) => {
            size(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
          }
        }
        break;
      }
    }
  }

}