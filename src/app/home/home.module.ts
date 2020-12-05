import { CalculatorWidgetComponent } from './../Components/calculator-widget/calculator-widget.component';
import { WeatherWidgetComponent } from './../Components/weather-widget/weather-widget.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { TimeWidgetComponent } from '../Components/time-widget-component/time-widget-component.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, TimeWidgetComponent, WeatherWidgetComponent, CalculatorWidgetComponent],
  entryComponents: [TimeWidgetComponent, WeatherWidgetComponent, CalculatorWidgetComponent]
})
export class HomePageModule {}
