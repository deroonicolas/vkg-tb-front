import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root', // Makes this service available application-wide
})
export class DataService {
  private apiUrl = environment.apiUrl; // Base URL of the API

  constructor(private http: HttpClient) {}

  /**
   * Fetches data from the server for a specific table.
   * @param tableName - The name of the table to query.
   * @returns An observable of the data as an array of objects.
   */
  getData(tableName: string): Observable<any[]> {
    // Append the table name as a query parameter to the API URL
    const urlWithParams = `${this.apiUrl}/save_table.php?table=${tableName}`;
    // Sends a GET request to the API and returns the response as an observable
    return this.http.get<any[]>(urlWithParams);
  }
}
