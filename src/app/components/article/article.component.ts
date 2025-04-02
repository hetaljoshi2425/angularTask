import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { Articles } from '../../utils/models/article';

@Component({
  selector: 'app-article',
  imports: [],
  providers: [DatePipe],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent implements OnInit{
  articleId: string = '';
  articleData!: Articles;
  constructor(private activateedRoute: ActivatedRoute,public articleService: ArticleService){
    
  }

  ngOnInit(): void {
    this.activateedRoute.queryParams.subscribe((data) => {
      this.articleId = data['id'];
      console.log(this.articleId);
      
    })
    this.articleService.getArticleById(this.articleId).subscribe((data) => {
      this.articleData = data;
      console.log(this.articleData);
      
    })
  }

}
