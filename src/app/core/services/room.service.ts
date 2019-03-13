import { Room } from './../../models/room/room';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class RoomService {
  // api/products/products.json
    private roomUrl = 'https://vard12.lc.gov/dataservices/webapi/roomsetup/api/Room?pageNumber=1&pageSize=5';

    constructor(private http: HttpClient) {}

    getRooms(): Observable<Room[]> {
        return this.http.get<Room[]>(this.roomUrl).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data)))
        );
    }
}
