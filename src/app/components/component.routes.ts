import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'list',
        loadComponent: () => import('./components/article-list/article-list.component').then(m => m.ArticleListComponent)
    }
];
