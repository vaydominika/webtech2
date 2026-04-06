import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cat {
  _id?: string;
  name: string;
  gender: 'bak' | 'nőstény';
  color: string;
  breed?: string;
  estimatedAge?: number;
  status: string;
  arrivalDate: Date;
  description: string[];
  imageUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CatService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/cats';

  getCats(): Observable<Cat[]> {
    return this.http.get<Cat[]>(this.apiUrl);
  }

  getCat(id: string): Observable<Cat> {
    return this.http.get<Cat>(`${this.apiUrl}/${id}`);
  }

  addCat(cat: Cat): Observable<Cat> {
    return this.http.post<Cat>(this.apiUrl, cat);
  }

  updateCat(id: string, cat: Partial<Cat>): Observable<Cat> {
    return this.http.patch<Cat>(`${this.apiUrl}/${id}`, cat);
  }

  deleteCat(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
