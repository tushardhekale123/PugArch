
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Facility {
  id: number;
  name: string;
  location: string;
  status: string;
  score: number;
}

@Injectable({
  providedIn: 'root'
})
export class FacilityService {
  private apiUrl =
    'http://localhost:5001/api/facilities';

  constructor(private http: HttpClient) {}

  getFacilities(): Observable<Facility[]> {
    return this.http.get<Facility[]>(this.apiUrl);
  }
}

