import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Meme } from '../models/meme';
import { TextElement } from '../models/textElement';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  meme: Meme | null = null
  textSelected: TextElement | null = null

  url: string = isDevMode() ? 'http://localhost:5000/api/v1/':'https://meme-generator-api-ashen.vercel.app/api/v1/';

  constructor(private _http:HttpClient) { }
  
  login(email: string, password: string) {
    return this._http.post(`${this.url}users/login`, {email, password})
  }

  register(email: string, password: string, confirmPassword: string) {
    return this._http.post(`${this.url}users/register`, {email, password, 'confirm_password':confirmPassword})
  }

  getMemes(): Observable<Meme[]> {
    return this._http.get<Meme[]>(`${this.url}memes`)
  }

  getMemeById(memeId: string): Observable<Meme>  {
    return this._http.get<Meme>(`${this.url}memes/${memeId}`)
  }

  deleteMemeById(memeId: string): Observable<Meme>  {
    return this._http.delete<Meme>(`${this.url}memes/${memeId}`)
  }

  createMeme(image: string, name: string): Observable<Meme> {
    return this._http.post<Meme>(`${this.url}memes`, {image, name})
  }

  saveTexts(texts: TextElement[]) {
    return this._http.put<TextElement>(`${this.url}memes/${this.meme?._id}/texts`, texts)
  }

}
