import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Meme } from '../models/meme';
import { TextElement } from '../models/textElement';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  meme: Meme | null = null
  texts: TextElement[] = []
  textSelected: TextElement | null = null

  url: string = 'http://localhost:5000/api/v1/';

  constructor(private _http:HttpClient) { }
  
  login(email: string, password: string) {
    return this._http.post(`${this.url}users/login`, {email, password})
  }

  getMemes(): Observable<Meme[]> {
    return this._http.get<Meme[]>(`${this.url}memes`)
  }

  getMemeById(memeId: string): Observable<Meme>  {
    return this._http.get<Meme>(`${this.url}memes/${memeId}`)
  }

  createMeme(image: string): Observable<Meme> {
    return this._http.post<Meme>(`${this.url}memes`, {image})
  }

  addText(x: number, y: number, color: string, size: number) {
    return this._http.post<TextElement>(`${this.url}memes/${this.meme?._id}/text`, {x, y, color, size})
  }

  deleteText(textId: string) {
    return this._http.delete(`${this.url}memes/${this.meme?._id}/text/${textId}`)
  }

}
