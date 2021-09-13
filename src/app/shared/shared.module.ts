import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule} from "@ngx-translate/core";
import { BannerComponent } from './components/banner/banner.component';



@NgModule({
  declarations: [
    BannerComponent
  ],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [
    TranslateModule,
    BannerComponent
  ]
})
export class SharedModule { }
