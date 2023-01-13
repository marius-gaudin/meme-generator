import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImgFlipResult } from '../models/imgFlipResult';

@Injectable({
  providedIn: 'root'
})
export class ImgflipService {
  url: string = 'https://api.imgflip.com/get_memes';

  constructor(private _http: HttpClient) { }

  getMemes(): Observable<ImgFlipResult> {
    return this._http.get<ImgFlipResult>(this.url)
  }
}
