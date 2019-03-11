import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpExampleService {
  // url = environment.serverName + environment.apiUrl + this.apiEndpoint;
  url = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  get(filter = '', orderby = ''): Observable<any[] | string> {
    return this.http.get<any[]>(this.url)
      .pipe(
        map((res) => res),
        catchError(() => throwError('Error loading example'))
      );
  }
}
