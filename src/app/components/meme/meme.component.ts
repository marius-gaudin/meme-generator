import { Component, ViewChild } from '@angular/core';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-meme',
  templateUrl: './meme.component.html',
  styleUrls: ['./meme.component.scss']
})
export class MemeComponent {
  @ViewChild('container') container: any; 

  download() {
    domtoimage.toBlob(this.container.nativeElement)
      .then(function (blob) {
        saveAs(blob, 'Meme');
      });
  }

}
