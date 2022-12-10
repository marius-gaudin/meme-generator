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

  ngAfterViewInit() {
    this.setHeight()
  }

  setHeight() {
    this.height = this.textArea.nativeElement.scrollHeight - 20;
  }

  resize(event: any) {
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
  }

  getWidth() {
    
  }
}