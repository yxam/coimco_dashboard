import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from './pages/login/_guards/index';

export const routes: Routes = [
  { path: '', redirectTo: 'pages/dashboard', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' , pathMatch: 'full' },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
