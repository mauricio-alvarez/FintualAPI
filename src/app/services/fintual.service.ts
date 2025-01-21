import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root', // Ensures this service is available throughout the app
})
export class FintualService {

  private http = inject(HttpClient);
  private baseUrl = 'https://fintual.cl/api/real_assets'; // Base API URL

  /** Mapeo de IDs a nombres personalizados */
  private fundNames: { [key: number]: string } = {
    15077: 'Very Conservative Streep',
    188: 'Conservative Clooney',
    187: 'Moderate Pit',
    186: 'Risky Norris',
  };

  /** Get today's date in YYYY-MM-DD format */
  private getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  /** Fetch fund price history for a given fund ID */
  getFundHistory(fundId: number, fromDate: string, toDate: string): Observable<{ name: string; series: { name: string; value: number }[] }> {
    const url = `${this.baseUrl}/${fundId}/days?from_date=${fromDate}&to_date=${toDate}`;

    return this.http.get<any>(url).pipe(
      map((response) => ({
        name: this.fundNames[fundId] || `Fund ${fundId}`,
        series: response.data
          .map((item: any) => ({
            name: item.attributes.date,
            value: item.attributes.price,
          }))
          .sort((a: { name: string }, b: { name: string }) => new Date(a.name).getTime() - new Date(b.name).getTime())
      }))
    );
  }

  constructor() {}

  /** Fetch all funds with custom date range */
  getAllFunds(fromDate: string, toDate: string): Observable<any[]> {
    const fundIds = Object.keys(this.fundNames).map(Number);
    const requests = fundIds.map((id) => this.getFundHistory(id, fromDate, toDate));
    return forkJoin(requests);
  }

  /** Fetches asset details by ID */
  getAssetById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
}
