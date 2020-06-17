import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
///import grafica
import { ChartsModule } from 'ng2-charts';
import { DatePipe } from '@angular/common';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }]),
    ChartsModule///import para graficas
  ],
  declarations: [Tab3Page],
  ///Datepipe formatter date
  providers: [DatePipe]
})
export class Tab3PageModule {}
