import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from '.';
import { FooterModule } from './components/footer/footer.module';
import { HeaderModule } from './components/header/header.module';
import { MainComponent } from './components/main/main.component';

@NgModule({
  declarations: [
    LayoutComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    HeaderModule,
    FooterModule,
    RouterModule
  ],
  exports: [
    HeaderModule,
    FooterModule,
    RouterModule,
    MainComponent
  ]
})
export class LayoutModule { }
