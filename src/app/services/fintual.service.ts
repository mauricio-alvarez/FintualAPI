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
  getFundHistory(fundId: number): Observable<{ name: string; series: { name: string; value: number }[] }> {
    const today = this.getTodayDate();
    const url = `${this.baseUrl}/${fundId}/days?to_date=${today}`;

    return this.http.get<any>(url).pipe(
      map((response) => ({
        name: this.fundNames[fundId] || `Fund ${fundId}`, // Usa el nombre personalizado o el ID si no está en la lista
        series: response.data
          .map((item: any) => ({
            name: new Date(item.attributes.date),
            value: item.attributes.price,
          }))
          .sort((a: any, b: any) => b.name.getTime() - a.name.getTime()) // Ordenar por fecha descendente
      }))
    );
  }

  constructor() {}

  /** Fetch all 4 funds and combine results */
  getAllFunds(): Observable<any[]> {
    const fundIds = Object.keys(this.fundNames).map(Number);
    const requests = fundIds.map((id) => this.getFundHistory(id));
    return forkJoin(requests); // Ejecuta todas las llamadas API en paralelo
  }

  /** Fetches asset details by ID */
  getAssetById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
}
