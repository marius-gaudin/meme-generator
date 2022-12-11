import { Component, Input, ViewChild } from '@angular/core';
import { faUpRightAndDownLeftFromCenter } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent {
  @ViewChild('textArea') textArea: any; 
  @Input() container?: String;
  width: number = 200;
  height: number = 0;
  x: number = 0;
  y: number = 0;
  faUpRightAndDownLeftFromCenter = faUpRightAndDownLeftFromCenter;
  active: boolean = false;

  ngAfterViewInit() {
    this.setHeight()
  }

  setHeight() {
    this.height = this.textArea.nativeElement.scrollHeight - 20;
  }

  focus(state: boolean) {
    this.active = state;
  }

  resize(event: any) {
    event.preventDefault();
    if(event.type == "pointerdown") {
      this.x = event.clientX;
      this.y = event.clientY;

      document.onmouseup = (e) => {
        document.onmouseup = null;
        document.onmousemove = null;
      }
      document.onmousemove = (e) => {
        e.preventDefault();
        this.width += e.clientX - this.x;
        this.x = e.clientX;
        this.height += e.clientY - this.y;
        this.y = e.clientY;
      }
    } else {
      this.x = event.changedTouches[0].clientX;
      this.y = event.changedTouches[0].clientY;

      document.ontouchend = (e) => {
        document.ontouchend = null;
        document.ontouchmove = null;
      }
      document.ontouchmove = (e) => {
        e.preventDefault();
        this.width += e.changedTouches[0].clientX - this.x;
        this.x = e.changedTouches[0].clientX;
        this.height += e.changedTouches[0].clientY - this.y;
        this.y = e.changedTouches[0].clientY;
      }
    }
  }

}