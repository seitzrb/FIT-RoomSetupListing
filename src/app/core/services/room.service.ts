import { Room } from './../../models/room/room';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})

export class RoomService extends BaseService {
  // api/products/products.json
    roomUrl = "https://vard12.lc.gov/dataservices/webapi/roomsetup/api/Room";

    constructor(private http: HttpClient) { super(); }

    getRooms(): Observable<Room[]> {
      const options = { headers: new HttpHeaders({'Accept': 'application/json'})};
      return this.http.get<Room[]>(this.roomUrl, options)
         .pipe (
             catchError((err) => 
                 throwError(err.Message)
             )   
        
         );

    }
}
