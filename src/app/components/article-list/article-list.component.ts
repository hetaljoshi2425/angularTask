import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ArticlePipe } from '../../utils/pipes/article.pipe';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ArticleListCardComponent } from './article-list-card/article-list-card.component';
import { Articles } from '../../utils/models/article';



@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule,RouterModule,ArticleListCardComponent],
  providers: [ArticleService,DatePipe],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.scss',
})
export class ArticleListComponent implements OnInit {

  articlesList$: Observable<Articles[]> | null = null;
  private destroy$ = new Subject<void>();
  constructor(
    public articleService: ArticleService,
    public router: Router,
    private datePipe: DatePipe
  ) {

  }

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles(): void{
    this.articlesList$ = this.articleService.getArticles().pipe(
      tap(data => console.log("data fetched successfully")),
      takeUntil(this.destroy$)
  );
  }

  routeToDetails(article: Articles){
    this.router.navigate(['/article/'+article.id, article])
  }

  transformDate(date: string){
   return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
}
