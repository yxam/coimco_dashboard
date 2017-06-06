import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './pages.routing';
import { NgaModule } from '../theme/nga.module';
import { AppTranslationModule } from '../app.translation.module';

import { Pages } from './pages.component';
import { Login } from './login/index';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './login/_guards/index';

@NgModule({
  imports: [FormsModule, ReactiveFormsModule, CommonModule, AppTranslationModule, NgaModule, routing],
  declarations: [Pages],
  providers: [AuthGuard],
})
export class PagesModule {
}
