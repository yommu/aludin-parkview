import { Routes } from '@angular/router';

export const routes: Routes = [{
  path: '',
  loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
}, {
  path: 'stanovi/sprat/:sprat/stan/:stan',
  loadComponent: () => import('./components/stan/stan.component').then(m => m.StanComponent)
}, {
  path: 'stanovi/sprat/:sprat',
  loadComponent: () => import('./components/sprat/sprat.component').then(m => m.SpratComponent)
}, {
  path: 'stanovi/sprat',
  loadComponent: () => import('./components/sprat/sprat.component').then(m => m.SpratComponent)
}, {
  path: 'stanovi',
  loadComponent: () => import('./components/sprat/sprat.component').then(m => m.SpratComponent)
}, {
  path: 'lokacija',
  loadComponent: () => import('./components/lokacija.component').then(m => m.LokacijaComponent)
}
// {
//   path: 'stanovi',
//   loadComponent: () => import('./components/stanovi/stanovi.component').then(m => m.StanoviComponent)
// }
];
