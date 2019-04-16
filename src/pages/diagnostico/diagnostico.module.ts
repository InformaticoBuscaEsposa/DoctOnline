import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiagnosticoPage } from './diagnostico';

@NgModule({
  declarations: [
    DiagnosticoPage,
  ],
  imports: [
    IonicPageModule.forChild(DiagnosticoPage),
  ],
})
export class DiagnosticoPageModule {}
