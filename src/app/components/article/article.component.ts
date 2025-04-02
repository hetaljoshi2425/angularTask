import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { Articles } from '../../utils/models/article';
import { Observable, map, switchMap,startWith,catchError, of } from 'rxjs';

@Component({
  selector: 'app-article',
  imports: [CommonModule],
  providers: [DatePipe],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent implements OnInit {
  articleId: string = '';
  article$!: Observable<{
    loading: boolean;
    error: string | null;
    data?: Articles;
  }>;

  constructor(
    private activatedRoute: ActivatedRoute,
    public articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.article$ = this.activatedRoute.params.pipe(
      map(params => params['id']),
      switchMap(id => {
        this.articleId = id;
        return this.articleService.getArticleById(id).pipe(
          map(data => ({
            loading: false,
            error: null,
            data
          })),
          startWith({ loading: true, error: null }),
          catchError(error => of({
            loading: false,
            error: 'Failed to load article',
            data: undefined
          }))
        );
      })
    );
  }
}
