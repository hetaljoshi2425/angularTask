import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Articles } from '../utils/models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  baseUrl = `http://localhost:3000/`;
  constructor(
    private httpClient: HttpClient
  ) { }

  getArticles(): Observable<Articles[]>{
    const url = `${this.baseUrl}articles`;
    // return this.httpClient.get(url);  
    return this.httpClient.get<Articles[]>(url).pipe(map(data => data));
  }
  getArticleById(id: string): Observable<Articles>{
    const url = `${this.baseUrl}articles/${id}`;
    // return this.httpClient.get(url);  
    return this.httpClient.get<Articles>(url).pipe(map(data => data));
  }
  addArticles(data: any){
    const url = `${this.baseUrl}articles`;
    
    return this.httpClient.post<Articles[]>(url,data).pipe(map(data => data)); 
  }
}
