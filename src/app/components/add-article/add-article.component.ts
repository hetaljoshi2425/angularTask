import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArticleService } from '../../services/article.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { catchError, EMPTY, Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-add-article',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-article.component.html',
  styleUrl: './add-article.component.scss'
})
export class AddArticleComponent implements OnInit {

  articleForm!: FormGroup;
  selectedImage: File | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    public articleService: ArticleService,
    public router: Router
  ) {

  }

  ngOnInit(): void {
    this.articleForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.minLength(10)]],
      author: ['', [Validators.required, Validators.minLength(2)]],
      image: [''],
      created_at: [new Date()],
      updated_at: [new Date()],
    });
  }

  onImageSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result; // This will be a base64 string
        this.articleForm.patchValue({
          image: e.target.result
        });
        this.selectedImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }


  // Add these new methods to your component:
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedImage = e.target.result;
          this.articleForm.patchValue({
            image: e.target.result
          });
        };
        reader.readAsDataURL(file);
      }
    }
  }

  onSubmit() {
    if (this.articleForm.invalid) {
      alert('Please check form details');
      return;
    }

    const articleData = {
      ...this.articleForm.value,
      image: this.selectedImage // This will save the base64 string in JSON
    };


    // In your onSubmit method:
    this.articleService.addArticles(articleData).pipe(
      tap(() => {
        alert('article saved successfully');
        this.articleForm.reset();
      }),
      takeUntil(this.destroy$),
      catchError(error => {
        alert('Error saving article');
        return EMPTY;
      })
    ).subscribe(() => {
      this.router.navigate(['/list']);
    });
  }
}
