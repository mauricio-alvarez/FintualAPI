import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FintualService } from './services/fintual.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';
import { LegendPosition } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-root',
  standalone: true,
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
  
  fromDate: string = '2019-04-22'; // Default
  toDate: string = new Date().toISOString().split('T')[0]; // Today’s date


  constructor() {
    this.fetchFunds();
  }
  fetchFunds() {
    this.fintualService.getAllFunds(this.fromDate, this.toDate).subscribe((data) => {
      this.fundsData.set(data);
    });
  }

  updateChart() {
    if (new Date(this.fromDate) > new Date(this.toDate)) {
      alert('Error: From date must be before To date.');
      return;
    }
    this.fetchFunds();
  }

  resetDates() {
    this.fromDate = '2019-04-22';
    this.toDate = new Date().toISOString().split('T')[0];
    this.fetchFunds();
  }

   // Format Y-axis values to percentage
   formatYAxis(value: number): string {
    return `$ ${value.toFixed(1)}`; // Example: "-50.0%" or "25.3%"
  }

  // Reduce the number of X-axis labels (show only specific years)
  formatXAxis(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    return [2019, 2020, 2021, 2022, 2023, 2024,2025].includes(year) 
      ? year.toString() 
      : '';
  }
  
}
