import { DatePipe } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { Articles } from '../../utils/models/article';
import { Subject, takeUntil, tap, switchMap } from 'rxjs';

@Component({
  selector: 'app-article',
  imports: [],
  providers: [DatePipe],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent implements OnInit, OnDestroy {
  articleId: string = '';
  articleData!: Articles;
  loading: boolean = false;
  error: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    public articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        takeUntil(this.destroy$),
        tap(() => {
          this.loading = true;
          this.error = null;
        }),
        switchMap(params => {
          this.articleId = params['id'];
          console.log(this.articleId);
          return this.articleService.getArticleById(this.articleId).pipe(
            tap({
              next: (data) => {
                this.loading = false;
                this.articleData = data;
                console.log(this.articleData);
                
              },
              error: (err) => {
                this.loading = false;
                this.error = 'Failed to load article';
              }
            })
          );
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
