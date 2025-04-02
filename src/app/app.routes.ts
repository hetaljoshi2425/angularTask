import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import path from 'path';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
    {
        path:'',
        component: LayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'list',
                pathMatch: 'full'
            },
            {
                path: 'list',
                loadComponent: () => import('./components/article-list/article-list.component').then(m => m.ArticleListComponent)
            },
            {
                path: 'add',
                loadComponent: () => import('./components/add-article/add-article.component').then(m => m.AddArticleComponent)
            },
            {
                path: 'view/:id',
                loadComponent: () => import('./components/article/article.component').then(m => m.ArticleComponent)
            }
]
}
];
