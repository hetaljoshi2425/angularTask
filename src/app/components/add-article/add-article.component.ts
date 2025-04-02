import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArticleService } from '../../services/article.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-article',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './add-article.component.html',
  styleUrl: './add-article.component.scss'
})
export class AddArticleComponent implements OnInit {

  articleForm!: FormGroup;

  constructor(
    private fb : FormBuilder,
    public articleService: ArticleService,
  public router: Router) {

  }

  ngOnInit(): void {
    this.articleForm = this.fb.group({
      title: ['',[Validators.required,Validators.minLength(3)]],
      content: ['',[Validators.required,Validators.minLength(10)]],
      created_at: [new Date()],
      updated_at: [new Date()],
    });
  }

  onSubmit() {
    if(this.articleForm.invalid){
      alert('Pleae check form details');
      return;
    }
    this.articleService.addArticles(this.articleForm.value).subscribe((data) => {
      alert('article saved successfully');
      this.articleForm.reset();
      this.router.navigate(['/list']);
    })
  }
}
