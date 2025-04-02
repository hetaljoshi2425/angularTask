import { Component, Input } from '@angular/core';
import { ArticlePipe } from '../../../utils/pipes/article.pipe';
import { Articles } from '../../../utils/models/article';
import { DatePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-article-list-card',
  imports: [ArticlePipe,DatePipe,RouterModule],
  templateUrl: './article-list-card.component.html',
  styleUrl: './article-list-card.component.scss'
})
export class ArticleListCardComponent {
 @Input() article!: Articles;

 constructor(public router: Router){
  console.log(this.article);
  
 }

 gotoView(id: string){
  console.log(id);
  
  // this.router.navigate([`/view/${id}`])
 }
}
