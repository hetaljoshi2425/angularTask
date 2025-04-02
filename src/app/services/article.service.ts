import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, catchError } from 'rxjs';
import { Articles } from '../utils/models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private baseUrl = 'http://localhost:3000/';

  constructor(private httpClient: HttpClient) { }

  getArticles(): Observable<Articles[]> {
    const url = `${this.baseUrl}articles?_sort=-updated_at`;
    return this.httpClient.get<Articles[]>(url).pipe(
      map(response => response),
      catchError(error => {
        console.error('Error fetching articles:', error);
        throw error;
      })
    );
  }

  getArticleById(id: string): Observable<Articles> {
    const url = `${this.baseUrl}articles/${id}`;
    return this.httpClient.get<Articles>(url).pipe(
      map(response => response),
      catchError(error => {
        console.error(`Error fetching article ${id}:`, error);
        throw error;
      })
    );
  }

  addArticles(data: Articles): Observable<Articles[]> {
    const url = `${this.baseUrl}articles`;
    return this.httpClient.post<Articles[]>(url, data).pipe(
      map(response => response),
      catchError(error => {
        console.error('Error adding article:', error);
        throw error;
      })
    );
  }
}
