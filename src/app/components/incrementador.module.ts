import { NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';

import { IncrementadorComponent } from './incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';
import { GraphicpieComponent } from './graphicpie/graphicpie.component';

import { ChartsModule } from 'ng2-charts';

@NgModule({
   declarations: [
      IncrementadorComponent,
      GraphicpieComponent
   ],
   exports: [
      IncrementadorComponent,
      GraphicpieComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      ChartsModule
   ]
})
export class IncrementadorModule { }