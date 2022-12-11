import { Component, Input, ViewChild } from '@angular/core';

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

  type: String = '';

  ngAfterViewInit() {
    this.setHeight()
  }

  setHeight() {
    this.height = this.textArea.nativeElement.scrollHeight - 20;
  }

  resize(event: any) {
    if(event.type == "pointerdown") {
      this.type = "pointerdown";
      this.x = event.clientX;
      this.y = event.clientY;

      document.onmouseup = (e) => {
        document.onmouseup = null;
        document.onmousemove = null;
      }
      document.onmousemove = (e) => {
        this.width += e.clientX - this.x;
        this.x = e.clientX;
        this.height += e.clientY - this.y;
        this.y = e.clientY;
      }
    } else {
      this.type = "touch";
      this.x = event.changedTouches[0].clientX;
      this.y = event.changedTouches[0].clientY;

      document.ontouchend = (e) => {
        document.ontouchend = null;
        document.ontouchmove = null;
      }
      document.ontouchmove = (e) => {
        this.width += e.changedTouches[0].clientX - this.x;
        this.x = e.changedTouches[0].clientX;
        this.height += e.changedTouches[0].clientY - this.y;
        this.y = e.changedTouches[0].clientY;
      }
    }
  }

}