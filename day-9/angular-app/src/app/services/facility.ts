import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Facility {
  id: number;
  name: string;
  location: string;
  status: string;
  score: number;
}

interface ApiPost {
  id: number;
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root'
})
export class FacilityService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  getFacilities(): Observable<Facility[]> {
    return this.http.get<ApiPost[]>(this.apiUrl).pipe(
      map(posts =>
        posts.slice(0, 10).map(post => ({
          id: post.id,
          name: post.title,
          location: 'Demo Location',
          status: post.id % 3 === 0 ? 'Attention' : 'Safe',
          score: 50 + (post.id % 51)
        }))
      )
    );
  }
}