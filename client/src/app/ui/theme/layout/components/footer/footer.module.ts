import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { IconsModule } from 'src/app/ui/icons/icons.module';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    IconsModule,
    MatButtonModule,
    HttpClientModule
  ],
  exports: [FooterComponent]
})
export class FooterModule { }
