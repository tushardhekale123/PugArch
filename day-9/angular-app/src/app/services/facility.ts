
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

interface DemoPost {
  id: number;
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root'
})
export class FacilityService {
  private apiUrl =
    'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  getFacilities(): Observable<Facility[]> {
    return this.http.get<DemoPost[]>(this.apiUrl).pipe(
      map(posts =>
        posts.slice(0, 10).map((post, index) => ({
          id: post.id,
          name: post.title
            .split(' ')
            .slice(0, 4)
            .join(' '),
          location: `Facility Location ${index + 1}`,
          status: ['Safe', 'Warning', 'Critical'][index % 3],
          score: 60 + ((post.id * 7) % 41)
        }))
      )
    );
  }
}

