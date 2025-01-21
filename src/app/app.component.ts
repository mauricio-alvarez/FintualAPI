import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FintualService } from './services/fintual.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';
import { LegendPosition } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    CommonModule,  NgxChartsModule, FormsModule
  ]
})
export class AppComponent {
  title = 'FintualAPI';
  public legendPosition: LegendPosition = LegendPosition.Below;

  private fintualService = inject(FintualService);

  fundsData = signal<any[]>([]);

  constructor() {
    this.fetchFunds();
  }
  fetchFunds() {
    this.fintualService.getAllFunds().subscribe((data) => {
      this.fundsData.set(data);
    });
  }
}
