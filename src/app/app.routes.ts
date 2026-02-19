import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Blog } from './components/blog/blog';
import { BlogDetails } from './components/blog-details/blog-details';
import { About } from './components/about/about';
import { NotFound } from './components/not-found/not-found';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home, title: 'home' },
  {
    path: 'blog',
    component: Blog,
    // loadComponent: () => import('./components/blog/blog').then((m) => m.Blog),
    title: 'blog',
  },
  {
    path: 'blog:category',
    component: Blog,
    // loadComponent: () => import('./components/blog/blog').then((m) => m.Blog),
    title: 'blog',
  },
  {
    path: 'blog/:slug',
    component: BlogDetails,
    // loadComponent: () =>
    //   import('./components/blog-details/blog-details').then((m) => m.BlogDetails),
    title: 'blog-details',
  },
  {
    path: 'about',
    component: About,
    // loadComponent: () => import('./components/about/about').then((m) => m.About),
    title: 'about',
  },
  {
    path: '**',
    component: NotFound,
    // loadComponent: () => import('./components/not-found/not-found').then((m) => m.NotFound),
    title: 'not-found',
  },
];
